'use client';
import { useEffect, useState } from 'react';
import { WidgetContext, htmlAttributes } from '@progress/sitefinity-nextjs-sdk';
import { DocumentWidgetEntity } from './DocsRecent.entity';
import './DocsRecent.css';
import { ContentListsCommonRestService } from '@progress/sitefinity-nextjs-sdk/widgets';
import { Tracer } from '@progress/sitefinity-nextjs-sdk/diagnostics/empty';
import { useCurrentUser } from '../../hooks/useCurrentUser';

interface DocumentItem {
    Id: string;
    Title: string;
    Url: string;
    Extension: string;
    LastModified: string;
    TotalSize?: number;
    Roles?: string[];
}

export function DocumentList(props: WidgetContext<DocumentWidgetEntity>) {
    const { user } = useCurrentUser();

    const [documents, setDocuments] = useState<DocumentItem[]>([]);
    const [loading, setLoading] = useState(true);

    const dataAttributes = htmlAttributes(props);
    const { ctx } = Tracer.traceWidget(props, true);
    const context = props.requestContext;

    useEffect(() => {
        if (!user) return;

        const fetchDocuments = async () => {
            try {
                setLoading(true);
                const lists = await ContentListsCommonRestService.getItems(
                    props.model.Properties,
                    props.requestContext.detailItem,
                    context,
                    0,
                    ctx,
                    false,
                );
                lists.Items.sort(
                    (a: any, b: any) => new Date(b.LastModified).getTime() - new Date(a.LastModified).getTime(),
                );
                const mappedDocuments: DocumentItem[] = lists.Items.map((item: any) => ({
                    Id: item.Id,
                    Title: item.Title,
                    Url: item.Url,
                    Extension: item.Extension,
                    LastModified: item.LastModified,
                    TotalSize: item.TotalSize,
                    Roles: item.Roles.map((rol: any) => rol.Title),
                }));

                const docsFilteredByRole = user.roles ? filterDocsByRole(mappedDocuments, user.roles) : [];
                const lastFiveDocuments = docsFilteredByRole.slice(0, 5);
                setDocuments(lastFiveDocuments);
            } catch (error) {
                setDocuments([]);
            } finally {
                setLoading(false);
            }
        };

        fetchDocuments();
    }, [user]);


    function filterDocsByRole(docs: DocumentItem[], userRole: string): DocumentItem[] {
        return docs.filter((doc) => doc.Roles?.some((rol) => rol === userRole));
    }

    // Función para determinar el ícono basado en la extensión del archivo
    const getFileIcon = (extension: string) => {
        const ext = extension.toLowerCase();
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

    if (loading) {
        return (
            <div className='document-widget' {...dataAttributes}>
                <p className='titulo-widget'>{props.model?.Properties.Titulo}</p>
                <p className='text-widget1'>{props.model?.Properties.Texto}</p>
                <div className='document-list'>
                    <p>Cargando documentos...</p>
                </div>
            </div>
        );
    }

    return (
        <div className='document-widget' {...dataAttributes}>
            <p className='titulo-widget'>{props.model?.Properties.Titulo}</p>
            <p className='text-widget1'>{props.model?.Properties.Texto}</p>
            <div className='document-list'>
                {documents.length > 0 ? (
                    documents.map((doc: DocumentItem) => (
                        <a
                            href={doc.Url}
                            key={doc.Id}
                            className='document-item'
                            title={doc.Title}
                            target='_blank'
                            rel='noopener noreferrer'
                        >
                            <img src={getFileIcon(doc.Extension)} alt='' />
                            <p className='text-cards1'>{doc.Title}</p>
                        </a>
                    ))
                ) : (
                    <p>No hay documentos disponibles.</p>
                )}

                <a href='/administracion/manuales' className='document-item'>
                    <img src='/assets/dash.svg' alt='' />
                    <p className='text-cards1'>Ver mas</p>
                </a>
            </div>
        </div>
    );
}
