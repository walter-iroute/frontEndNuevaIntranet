'use client';
import React from 'react';
import { useEffect, useState } from 'react';
import { ChevronRight, FolderOpen, File, Download, List, Search, LayoutGrid, FileText, Printer } from 'lucide-react';

import { DocumentosTabsEntity } from './documentos.entity';

import { WidgetContext, htmlAttributes } from '@progress/sitefinity-nextjs-sdk';
import './style.css'; // Importa tu CSS
import { ContentListsCommonRestService } from '@progress/sitefinity-nextjs-sdk/widgets';
import { Tracer } from '@progress/sitefinity-nextjs-sdk/diagnostics/empty';
import { useCurrentUser } from '../../hooks/useCurrentUser';

//import { Folder as FolderIcon } from 'lucide-react';
//import FileIconURL from './svg/Union.svg'; // <-- ¡Cambio clave aquí!
//('Valor de FileIconSVG:', FileIconURL); // <-- Añade esta línea
interface Documento {
    Id: string;
    Title: string;
    Url: string;
    FolderPath: string;
    EmbedUrl: string;
    Type: 'folder' | 'file';
    ParentId?: string;
    Extension?: string; // Añade esta nueva propiedad opcional
    Roles?: string[];
}

interface BreadcrumbItem {
    name: string;
    path: string;
}

export function GestorArchivosWidget(props: WidgetContext<DocumentosTabsEntity>) {
    const { user } = useCurrentUser();

    const [documents, setDocuments] = useState<Documento[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPath, setCurrentPath] = useState('');
    const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbItem[]>([]);
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredDocs, setFilteredDocs] = useState<Documento[]>([]);
    const [rootFolders, setRootFolders] = useState<string[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>('');

    const dataAttributes = htmlAttributes(props);
    const { ctx } = Tracer.traceWidget(props, true);
    // Utilidad para capitalizar
    const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

    // Lógica para obtener el icono según la extensión
    const getFileIcon = (extension: string) => {
        const ext = extension.toLowerCase().replace(/^\./, ''); // quita el punto si lo tiene
        switch (ext) {
            case 'pdf':
                return '/images/default-source/bm-intranet/icons/iconpdf.png';
            case 'docx':
            case 'doc':
                return '/images/default-source/bm-intranet/icons/iconword.png';
            default:
                return '/assets/iconPdf.svg';
        }
    };

    // Utilidad para generar carpetas a partir de documentos
    function generateFoldersFromDocs(docs: Documento[]): Documento[] {
        const folderMap: Map<string, Documento> = new Map();
        const getFileExtensionFromUrl = (fileUrl: string): string => {
            if (!fileUrl) return '';
            const urlWithoutParams = fileUrl.split('?')[0];
            const parts = urlWithoutParams.split('.');
            if (parts.length > 1) {
                return parts.pop()?.toLowerCase() || '';
            }
            return '';
        };
        docs.forEach((doc) => {
            if (doc.Type === 'file' && !doc.Extension) {
                doc.Extension = getFileExtensionFromUrl(doc.Url);
            }
            const path = doc.Url.split('/docs/default-source/')[1];
            if (!path) return;
            const segments = path.split('/').slice(0, -1);
            let accumulatedPath = '';
            segments.forEach((segment, index) => {
                accumulatedPath = index === 0 ? segment : `${accumulatedPath}/${segment}`;
                if (!folderMap.has(accumulatedPath)) {
                    folderMap.set(accumulatedPath, {
                        Id: accumulatedPath,
                        Title: segment.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
                        Url: '',
                        EmbedUrl: '',
                        Type: 'folder',
                        FolderPath: accumulatedPath,
                    });
                }
            });
        });
        return Array.from(folderMap.values()).sort((a, b) => a.FolderPath.localeCompare(b.FolderPath));
    }

    // Devuelve solo las subcarpetas inmediatas de la carpeta raíz
    const getFirstLevelFolders = (allFolders: Documento[], root: string) => {
        return allFolders.filter((folder) => {
            const parts = folder.FolderPath.split('/');
            // Solo subcarpetas directas de la raíz
            return parts.length === 2 && parts[0] === root;
        });
    };

    useEffect(() => {
        if (!user) return;

        const fetchDocuments = async () => {
            try {
                setLoading(true);
                const lists = await ContentListsCommonRestService.getItems(
                    props.model.Properties,
                    props.requestContext.detailItem,
                    props.requestContext,
                    0,
                    undefined,
                    false,
                );
                // Mapeo los datos recibidos a la estructura Documento
                const docs: Documento[] = lists.Items.map((doc: any) => {
                    const folderPath =
                        doc.Url?.split('/docs/default-source/')[1]?.split('/').slice(0, -1).join('/') || '';
                    const rootFolder = folderPath.split('/')[0] || 'Documentos';
                    // Obtener extensión
                    let extension = '';
                    if (doc.Url) {
                        const urlWithoutParams = doc.Url.split('?')[0];
                        const parts = urlWithoutParams.split('.');
                        if (parts.length > 1) {
                            extension = parts.pop()?.toLowerCase() || '';
                        }
                    }
                    return {
                        Id: doc.Id,
                        Title: doc.Title,
                        Url: doc.Url,
                        EmbedUrl: doc.EmbedUrl,
                        Type: 'file',
                        FolderPath: folderPath,
                        ParentId: rootFolder,
                        Extension: extension,
                        Roles: doc.Roles.map((rol: any) => rol.Title),
                    };
                });

                const docsFilteredByRole = user.roles ? filterDocsByRole(docs, user.roles) : [];

                setDocuments(docsFilteredByRole);
            } catch (error) {
                setDocuments([]);
            } finally {
                setLoading(false);
            }
        };
        fetchDocuments();
    }, [props.model?.Properties, user]);

    function filterDocsByRole(docs: Documento[], userRole: string): Documento[] {
        return docs.filter((doc) => doc.Roles?.some((rol) => rol === userRole));
    }

    // Estructura de carpetas y documentos visibles según currentPath
    const [visibleDocs, setVisibleDocs] = useState<Documento[]>([]);
    useEffect(() => {
        if (loading) return;
        const generatedFolders = generateFoldersFromDocs(documents);
        const roots = Array.from(new Set(generatedFolders.map((f) => f.FolderPath.split('/')[0] as string)));
        setRootFolders(roots);
        const rootName = roots[0] || 'Documentos';
        // Si no hay categoría seleccionada, selecciona la primera subcarpeta de la raíz
        if (!selectedCategory) {
            const firstLevelFolders = getFirstLevelFolders(generatedFolders, rootName);
            if (firstLevelFolders.length > 0) {
                setSelectedCategory(firstLevelFolders[0].FolderPath);
                setCurrentPath(firstLevelFolders[0].FolderPath);
                setBreadcrumbs([
                    { name: capitalize(firstLevelFolders[0].Title), path: firstLevelFolders[0].FolderPath },
                ]);
            }
        }
        // Mostrar solo lo que está dentro de la subcarpeta seleccionada
        const docsInPath = documents.filter((d) => d.FolderPath === currentPath);
        const foldersInPath = generatedFolders.filter((f) => {
            const parts = f.FolderPath.split('/');
            return (
                f.FolderPath.startsWith(currentPath) &&
                parts.length === currentPath.split('/').filter(Boolean).length + 1
            );
        });
        setVisibleDocs([...foldersInPath, ...docsInPath]);
    }, [documents, currentPath, selectedCategory, loading]);

   // ...existing code...
    useEffect(() => {
        if (searchTerm.trim()) {
            const normalizedSearch = searchTerm.trim().toLowerCase();
            const filteredByTitle = documents.filter((doc) => {
                if (doc.Type !== 'file') return false;
                const titleNormalized = doc.Title.trim().toLowerCase();
                return titleNormalized.includes(normalizedSearch);
            });
            setFilteredDocs(filteredByTitle);
        } else {
            setFilteredDocs(visibleDocs);
        }
    }, [visibleDocs, searchTerm, documents]);
// ...existing code...

    const handleFolderClick = (folder: Documento) => {
        setCurrentPath(folder.FolderPath);
        setBreadcrumbs([...breadcrumbs, { name: folder.Title, path: folder.FolderPath }]);
    };

    const handleBreadcrumbClick = (index: number) => {
        const newBreadcrumbs = breadcrumbs.slice(0, index + 1);
        setBreadcrumbs(newBreadcrumbs);
        if (index === 0) {
            setCurrentPath(selectedCategory); // <--- ¡Aquí está el cambio!
        } else {
            setCurrentPath(newBreadcrumbs[index].path);
        }
        //setCurrentPath(index === 0 ? '' : newBreadcrumbs[index].path);
    };

    const totalItems = filteredDocs.length;

    return (
        <div className='container-manuales flex h-screen bg-gray-50' {...dataAttributes}>
            {/* Sidebar */}
            <div className='sidebar-left w-64  border-gray-200 p-4'>
                <h3 className='titulo_sidebar text-sm font-medium text-gray-700 mb-3'>Documentos</h3>
                <div className='space-y-1'>
                    {/* Mostrar subcarpetas de la raíz, no la raíz misma */}
                    {(() => {
                        const rootName = rootFolders[0] || 'manuales';
                        const generatedFolders = generateFoldersFromDocs(documents);
                        const firstLevelFolders = getFirstLevelFolders(generatedFolders, rootName);
                        return firstLevelFolders.map((folder) => (
                            <div
                                key={folder.FolderPath}
                                style={{ gap: '8px' }}
                                className={`flex items-center p-2 rounded cursor-pointer ${
                                    selectedCategory === folder.FolderPath
                                        ? 'selected-category'
                                        : 'unselected-category category-hover-effect'
                                }`}
                                onClick={() => {
                                    setSelectedCategory(folder.FolderPath);
                                    setCurrentPath(folder.FolderPath);
                                    setBreadcrumbs([{ name: capitalize(folder.Title), path: folder.FolderPath }]);
                                }}
                            >
                                <img
                                    style={{ width: '20.178985595703125', height: '17.236108779907227' }}
                                    src='/images/default-source/bm-intranet/icons/folder_icon_sm.png'
                                    alt=''
                                />
                                <span className='text-sm'>{capitalize(folder.Title)}</span>
                            </div>
                        ));
                    })()}
                </div>
            </div>

            {/* Main Content */}
            <div className='flex-1 flex flex-col'>
                {/* Header */}
                <div className='bg-white '>
                    {/* Tools Bar */}
                    <div className='tools_Bar flex items-center justify-between'>
                        <div className='flex items-center space-x-2 text-sm text-gray-600'>
                            {breadcrumbs.map((crumb, index) => (
                                <div key={index} className='flex items-center'>
                                    {index === 0 && ( // Render FolderIcon only for the first item (index 0)
                                        //<FolderOpen className='folder-open w-4 h-4 mr-2 text-gray-500' /> // Adjust size and color as needed
                                        <>
                                            {' '}
                                            {/* Use a React Fragment to group the icon and the first chevron */}
                                            <img
                                                style={{ width: '20.178985595703125', height: '17.236108779907227' }}
                                                src='/images/default-source/bm-intranet/icons/folder_icon_sm.png'
                                                alt=''
                                            />
                                            {/* This ChevronRight is specifically for the initial separator after the folder icon */}
                                            <ChevronRight className='guion_tools w-4 h-4 mx-2' />
                                        </>
                                    )}
                                    <button
                                        onClick={() => handleBreadcrumbClick(index)}
                                        className='toolsLetra hover:text-green-600'
                                    >
                                        {crumb.name}
                                    </button>
                                    {index < breadcrumbs.length - 1 && (
                                        <ChevronRight className='guion_tools w-4 h-4 mx-2' />
                                    )}
                                </div>
                            ))}
                        </div>
                        <div className='contenedorModeToggle flex items-center space-x-2'>
                            {/* View Mode Toggle */}
                            <div className='flex '>
                                <button
                                    onClick={() => setViewMode('grid')}
                                    className={`buttonToggle p-2 rounded-l-md ${
                                        viewMode === 'grid'
                                            ? 'bg-gray-200 text-green-600'
                                            : 'text-gray-600 hover:bg-gray-50'
                                    }`}
                                >
                                    <LayoutGrid className='w-5 h-5' />
                                </button>
                                <button
                                    onClick={() => setViewMode('list')}
                                    className={`buttonToggle p-2 ${
                                        viewMode === 'list'
                                            ? 'bg-gray-200 text-green-600'
                                            : 'text-gray-600 hover:bg-gray-50'
                                    }`}
                                >
                                    <List className='w-5 h-5' />
                                </button>
                            </div>
                            {/* Search */}

                            <div className='relative flex items-center'>
                                <Search className='w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none' />
                                <input
                                    className='search-bar pl-10 pr-4 py-2 border rounded-md text-sm w-full'
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder='Buscar documentos'
                                    style={{ height: '40px', paddingLeft: '2.5rem' }} // 2.5rem = 40px, suficiente para el icono
                                />
                            </div>
                        </div>
                    </div>
                    {/* Breadcrumbs */}
                </div>

                {/* Content Area */}
                <div className='content_area flex-1 p-4 overflow-auto'>
                    <div className='flex flex-col items-start space-x-4 border-b border-gray-100 pb-3'>
                        <h2 className='titulo_Breadcrumbs text-lg'>Categorías de proceso</h2>
                        <span className='total_item text-sm '>{totalItems} items total</span>
                    </div>
                    {filteredDocs.length > 0 ? (
                        <div className={viewMode === 'grid' ? 'grid grid-cols-4 gap-4' : 'space-y-1'}>
                            {filteredDocs.map((doc) => (
                                <div
                                    key={doc.Id}
                                    className={`group ${
                                        viewMode === 'grid'
                                            ? ' p-4 hover: cursor-pointer flex flex-col items-center justify-between'
                                            : 'flex items-center justify-between p-3 hover:bg-gray-50  cursor-pointer'
                                    }`}
                                    onClick={doc.Type === 'folder' ? () => handleFolderClick(doc) : undefined}
                                >
                                    <div
                                        className={`flex items-center ${
                                            viewMode === 'grid' ? 'flex-col text-center' : 'flex-1'
                                        }`}
                                        style={{ gap: '8px' }}
                                    >
                                        {doc.Type === 'folder' ? (
                                            <div
                                                className={` ${viewMode === 'grid' ? 'w-8 h-8 mb-2' : 'w-5 h-5 mr-3'}`}
                                            >
                                                <img
                                                    src='/images/default-source/bm-intranet/icons/folder_icon.png'
                                                    alt=''
                                                />
                                            </div>
                                        ) : (
                                            <div className={viewMode === 'grid' ? 'w-12 h-12 mb-2' : 'w-5 h-5 mr-3'}>
                                                <img
                                                    src={getFileIcon(doc.Extension || '')}
                                                    alt={`Icono de ${doc.Extension || 'archivo'}`}
                                                />
                                            </div>
                                        )}
                                        <span
                                            title={doc.FolderPath.split('/')
                                                .map((folder) =>
                                                    folder.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
                                                )
                                                .join(' / ')}
                                            className={`text-gray-800 ${
                                                viewMode === 'grid' ? 'text-sm' : 'text-sm font-medium'
                                            }`}
                                        >
                                            {doc.Title}
                                        </span>
                                    </div>

                                    {doc.Type === 'file' && (
                                        <div className='flex items-center space-x-2 group-hover:opacity-100 transition-opacity'>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation(); // Previene que el evento burbujee y active el clic en el div padre

                                                    // Crea un elemento <a> temporal
                                                    const link = document.createElement('a');
                                                    link.href = doc.Url; // Asigna la URL del documento
                                                    link.download = doc.Title || 'downloaded_file'; // Asigna el nombre de archivo sugerido (usa doc.Title si existe, sino un nombre genérico)
                                                    link.target = '_blank'; // Opcional: abre en una nueva pestaña (aunque para descarga no es tan relevante visualmente)

                                                    // Simula un clic en el enlace
                                                    document.body.appendChild(link); // Añade el enlace al DOM
                                                    link.click(); // Haz clic en el enlace
                                                    document.body.removeChild(link); // Elimina el enlace del DOM después de la descarga
                                                }}
                                                className='p-1 text-gray-500 hover:text-green-600 rounded'
                                                title='Descargar'
                                            >
                                                <Download className='w-4 h-4' />
                                            </button>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    window.open(doc.Url, '_blank');
                                                }}
                                                className='p-1 text-gray-500 hover:text-green-600 rounded'
                                                title='Ver'
                                            >
                                                <Printer className='w-4 h-4' />
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className='text-center py-12'>
                            <File className='w-12 h-12 text-gray-300 mx-auto mb-4' />
                            <p className='text-gray-500'>
                                {searchTerm
                                    ? 'No se encontraron documentos que coincidan con tu búsqueda.'
                                    : 'No hay documentos disponibles.'}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
