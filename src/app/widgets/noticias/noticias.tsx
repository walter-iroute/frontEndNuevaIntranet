'use client';
import React, { useEffect, useState } from 'react';
import { WidgetContext, htmlAttributes } from '@progress/sitefinity-nextjs-sdk';
import { getPageNumber, ContentListsCommonRestService } from '@progress/sitefinity-nextjs-sdk/widgets';
import { Tracer } from '@progress/sitefinity-nextjs-sdk/diagnostics/empty';
import { NoticiasWidgetEntity, INoticias, INoticiasImagen, IResponseNoticias } from './noticias.entity';
import { useSearchParams } from 'next/navigation';
import moment from 'moment';
import 'moment/locale/es'; // Import Spanish locale for moment.js
import './noticias.css';
// import "../Beneficios/beneficios.css";
export function NoticiasWidget(props: WidgetContext<NoticiasWidgetEntity>) {
    const dataAttributes = htmlAttributes(props);
    const {  ctx } = Tracer.traceWidget(props, true);
    // const [noticias, setNoticias] = useState<any[]>([]);
    const model = props.model;
    const properties = model.Properties;
    const context = props.requestContext;
    const searchParams = useSearchParams();
    // Paginador
    const [noticias, setNoticias] = useState<INoticias[]>([]);
    const [noticiasFiltradasPaginadas, SetnoticiasFiltradasPaginadas] = useState<INoticias[]>([]);
    const [paginaActual, setPaginaActual] = useState(1);
    const noticiasPorPagina = 9; // Display 4 cards per page

    moment.locale('es');

    const pageNumber = getPageNumber(
        properties.PagerMode,
        props.requestContext,
        properties.PagerQueryTemplate,
        properties.PagerTemplate,
    );

    function limitText(text: string, limit: number) {
        return text.length > limit ? text.substring(0, limit) + '...' : text;
    }

    function findLastNotices(lists: any[]) {
        lists = lists.filter((item: any) => moment(item.DateInit).format('YYYY') == moment().format('YYYY'));
        lists = lists.slice(0, 10);

        setNoticias(lists);
    }

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const lists = await ContentListsCommonRestService.getItems(
                    props.model.Properties,
                    props.requestContext.detailItem,
                    context,
                    pageNumber,
                    ctx,
                    props.model.Properties.ShowListViewOnChildDetailsView,
                );

                lists.Items = lists.Items.sort(
                    (a: any, b: any) => new Date(b.DateInit).getTime() - new Date(a.DateInit).getTime(),
                );
                const noticias: INoticias[] = lists.Items.map((item: any) => ({
                    Id: item.Id,
                    Title: item.Title,
                    Content: item.Content,
                    Tag: item.Tag,
                    TagColor: item.TagColor,
                    Img: item.Img,
                    DateInit: item.DateInit,
                }));
                
                setNoticias(noticias);
            

                if (searchParams.has('lastNotices')) {
                    const bol = searchParams.get('lastNotices');
                    if (bol) {
                        findLastNotices(lists.Items);
                    }
                }
            } catch (error) {
                console.error('Error fetching items:', error);
            }
        };
        fetchItems();
    }, []);

    // Efecto para manejar la paginación cuando 'noticias' o 'paginaActual' cambien
    useEffect(() => {
        const indiceUltimaNoticia = paginaActual * noticiasPorPagina;
        const indicePrimeraNoticia = indiceUltimaNoticia - noticiasPorPagina;
        const noticiasActuales = noticias.slice(indicePrimeraNoticia, indiceUltimaNoticia);
        SetnoticiasFiltradasPaginadas(noticiasActuales);
    }, [noticias, paginaActual, noticiasPorPagina]);

    // Calculo Total de Paginas
    const totalPaginas = Math.ceil(noticias.length / noticiasPorPagina);

    //Funciones para gestionar cambios de página
    const paginaAnterior = () => {
        if (paginaActual > 1) {
            setPaginaActual(paginaActual - 1);
        }
    };

    const cambiarPagina = (numeroPagina: number) => {
        setPaginaActual(numeroPagina);
    };

    const paginaSiguiente = () => {
        if (paginaActual < totalPaginas) {
            setPaginaActual(paginaActual + 1);
        }
    };

    return (
        // JSX Component
        <div className='contenedor_noticias' {...dataAttributes}>
            <div className='noticias_grid'>
                {noticiasFiltradasPaginadas.map((item, i) => {
                    return (
                        <div className='noticia_item' key={item.Id}>
                            <div
                                className='cards_noticias cursor-pointer'
                                onClick={() => (location.href = `/detalle-noticia?id=${item.Id}`)}
                            >
                                <figure className='cards_figure_noticias'>
                                    <img className='cards_image_noticias' src={item.Img[0].Url} alt='noticias' />
                                </figure>
                                <div className='cards_noticias_content'>
                                    <span className='badge' style={{ backgroundColor: item.TagColor }}>
                                        {item.Tag}
                                    </span>
                                    <p className='card-title-noticias' title={item.Title}>
                                        {limitText(item.Title, 70)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Pagination Controls */}
            {totalPaginas > 1 && (
                <div className='pagination_container'>
                    <button className='pagination_button' onClick={paginaAnterior} disabled={paginaActual === 1}>
                        &#8249;
                    </button>

                    {[...Array(totalPaginas)].map((_, index) => (
                        <button
                            key={index}
                            className={`card_point ${paginaActual === index + 1 ? 'card_point--active' : ''}`}
                            onClick={() => cambiarPagina(index + 1)}
                        ></button>
                    ))}

                    <button
                        className='pagination_button'
                        onClick={paginaSiguiente}
                        disabled={paginaActual === totalPaginas}
                    >
                        &#8250;
                    </button>
                </div>
            )}
        </div>
    );
}
