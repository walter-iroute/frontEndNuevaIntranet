'use client';
import './historial-noticias.css';
import { useEffect, useState } from 'react';
import { WidgetContext, htmlAttributes } from '@progress/sitefinity-nextjs-sdk';
import { HistorialNoticiasEntity } from './historial-noticias.entity';
import moment from 'moment';
import 'moment/locale/es'; // Import Spanish locale for moment.js
import "./historial_noticias.css";
import {  CallToActionEntity } from '@progress/sitefinity-nextjs-sdk/widgets';
import { INoticias } from '../noticias/noticias.entity';
export function HistorialNoticia(props: WidgetContext<HistorialNoticiasEntity & CallToActionEntity>) {
    const dataAttributes = htmlAttributes(props);
    const [notices, setItem] = useState<INoticias[]>([]);
    const [noticiasActualesFiltradas,SetnoticiasActualesFiltradas] = useState<INoticias[]>([]);

    const findUltimasNoticias = (lists: any[])=> {
    // Filtrar solo las del año actual
    const noticiasActuales = lists.filter((item: any) =>
        moment(item.DateInit).format('YYYY') === moment().format('YYYY')
    );

    // Ordenar por fecha descendente (más reciente primero)
    const ordenadas = noticiasActuales.sort(
        (a: any, b: any) => new Date(b.DateInit).getTime() - new Date(a.DateInit).getTime()
    );

    // Tomar solo las primeras 5
    const cincoUltimas = ordenadas.slice(0, 5);

    // Actualizar estado
    SetnoticiasActualesFiltradas(cincoUltimas);
}

     
    moment.locale('es');

    useEffect(() => {
        const fetchItems = async () => {
            try {

                const fetchedNotices = await fetch(`/api/default/notices`)
                    .then((res) => res.json());
                      // Ordenar y filtrar las del año actual (esto podrías dejarlo solo en findUltimasNoticias si quieres un solo punto de lógica)
            fetchedNotices.value.sort(
                (a: any, b: any) =>
                    new Date(b.DateInit).getTime() - new Date(a.DateInit).getTime()
            )

             /*   fetchedNotices.value.sort((a: any, b: any) => (new Date(b.DateInit).getTime() - new Date(a.DateInit).getTime()));
                fetchedNotices.value = fetchedNotices.value.filter((item: any) => (moment(item.DateInit).format('YYYY') == moment().format('YYYY')));
                fetchedNotices.value = fetchedNotices.value.slice(0, 5);
*/
                setItem(fetchedNotices.value);
                findUltimasNoticias(fetchedNotices.value)

            } catch (error) {
                console.error('Error fetching items:', error);
            }
        };
        fetchItems();
    }, []);

    return (
        <>
            <div  className=' contenedor_historial_noticia'  {...dataAttributes} >
                <header className='card_header_historial_noticia'>
                    <h3 className='card_title_header '>lo más reciente</h3>
                    <div className="linea" ></div>
                </header>
                <div className='row border_card '  >
                    {noticiasActualesFiltradas?.map((item, i) => {
                        return (
                                <div className='border_card_point' key={i}>
                                    <div className=' card_detalle_noticia'>
                                        <a href={`/detalle-noticia?id=${item.Id}`} key={i} className="text-decoration-none">
                                            <h4 className="card-title-noticas-detalle" title={item.Title} style={{ color: "#474747" }}>{item.Title}</h4>
                                        </a>
                                        <div className='text-start'>
                                            <span className="mb-2 text-end" style={{ color: "#538F61", fontWeight: "600", fontSize: "14px" }}>{
                                                (moment().format('L') == moment(item.DateInit).format('L')) ? "Hoy" :
                                                    (moment().subtract(1, 'days').format('L') == moment(item.DateInit).format('L')) ? "Ayer" : moment(item.DateInit).format('D [de] MMMM')
                                            }</span>
                                        </div>
                                    </div>
                                </div>
                        )
                    })}
                </div>
                <div className="container_buttom">
                    <button className="btn btn-success buttom_new" onClick={()=>{location.href= '/noticias?lastNotices=true'}}>Ver las últimas noticias</button>
                </div>
            </div>
       
        </>
    );
}