"use client";
import "./accordion-documentsV2.css";
import { htmlAttributes, WidgetContext } from "@progress/sitefinity-nextjs-sdk";
import { AccordionDocumentosEntityV2 } from "./accordion-documentos.entityV2";
import React, { useEffect, useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import { ContentListsCommonRestService } from "@progress/sitefinity-nextjs-sdk/widgets";
import { Tracer } from "@progress/sitefinity-nextjs-sdk/diagnostics/empty";

interface DocumentItem {
    Id: string;
    Title: string;
    Url: string;
    Extension: string;
    LastModified: string;
    TotalSize?: number;
}



export function AccordionDocumentosV2(props: WidgetContext<AccordionDocumentosEntityV2>) {
    const dataAttributes = htmlAttributes(props);
    const context = props.requestContext;
    const { span, ctx } = Tracer.traceWidget(props, true);

    const [openZona, setOpenZona] = useState<string | null>(null);
    const [listItems, setItems] = useState<any[]>([]);
    const [filterZona, setFilterZona] = useState<any[]>([]);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const catRes = await fetch('/api/default/flat-taxa');
                const catData = await catRes.json();
                setFilterZona(catData.value);

                  const documentsList = await ContentListsCommonRestService.getItems(
                        {
                            ...props.model.Properties,
                            SelectedItems: props.model.Properties.SelectedItems,
                        },
                        props.requestContext.detailItem,
                        context,
                        0,
                        ctx,
                        false,
                    );
                    setItems(documentsList.Items || []);
                
             
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchItems();
    }, []);

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
    // Agrupar los documentos por zonaId
    const documentosPorZona = new Map<string, any[]>();
    listItems.forEach((item) => {
        const zonaId = item.zonas?.[0];
        if (!zonaId) return;

        if (!documentosPorZona.has(zonaId)) {
            documentosPorZona.set(zonaId, []);
        }
        documentosPorZona.get(zonaId)!.push(item);
    });
    (documentosPorZona);


    // Abrir/cerrar zona
    const toggleZona = (zonaId: string) => {
        setOpenZona(openZona === zonaId ? null : zonaId);
    };

    return (
        <div {...dataAttributes}>
           {Array.from(documentosPorZona.entries()).map(([zonaId, documento]) => {
                const zona = filterZona.find(z => z.Id === zonaId);
                const nombreZona = zona?.Title || "Zona sin nombre";
                                return (
                    <div className="wrapper" key={zonaId}>
                        <button className="question-container" onClick={() => toggleZona(zonaId)}>
                            <p className="question-content m-0">{nombreZona}</p>
                            <RiArrowDropDownLine
                                className={`arrow ${openZona === zonaId ? 'open' : ''}`}
                            />
                        </button>

                        {openZona === zonaId && (
                            <div className="answer-container">
                                {documento.map((doc: any) => (
                                    <div key={doc.Id} className="mb-2 d-flex align-items-center ">
                                        
                                        {doc.documents?.map((doc: DocumentItem) => (
                                          
                                              <a
                                                    href={doc.Url}
                                                    key={doc.Id}
                                                    className='document-item'
                                                    title={doc.Title}
                                                    target='_blank'
                                                    rel='noopener noreferrer'
                                                >
                                                    <img src={getFileIcon(doc.Extension)} alt='' />
                                                </a>
                                        ))}
                                        <p>{doc.Title}</p>
                                    </div>
                                ))}

                            </div>
                        )}
                    </div>
                );
            })}
        
        </div>
    );
}
