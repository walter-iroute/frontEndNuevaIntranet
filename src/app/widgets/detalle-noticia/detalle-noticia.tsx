'use client';
import { useEffect, useState } from 'react';
import { WidgetContext, htmlAttributes } from '@progress/sitefinity-nextjs-sdk';
import { DetalleNoticiaEntity } from './detalle-noticia.entity';
import { useSearchParams } from 'next/navigation';
import {sanitizerHTML} from "../../utils/Sanitizer";

import moment from 'moment';
import 'moment/locale/es'; // Import Spanish locale for moment.js
import "./detalle-noticia.css";


export function DetalleNoticia(props: WidgetContext<DetalleNoticiaEntity>) {
    const dataAttributes = htmlAttributes(props);
    const [item, setItem] = useState<any>(null);
    const [img, setImg] = useState<any>(null);
    const searchParams = useSearchParams();
    moment.locale('es');    

    useEffect(() => {
        const fetchItems = async () => {
            try {

                const fetchedNotice = await fetch(`/api/default/notices(${searchParams.get('id')})`)
                    .then((res) => res.json());

                const img = await fetch(`/api/default/notices(${searchParams.get('id')})/Img`)
                    .then((res) => res.json());

                setItem(fetchedNotice);
                setImg(img);
         
                

                const el = document.getElementById("notice-content");
                if (el) {
                    el.innerHTML = fetchedNotice.Content;
                }

            } catch (error) {
                console.error('Error fetching items:', error);
            }
        };
        fetchItems();
    }, [searchParams]);

    return (
        
            
                <div className='row container_detalles  ' {...dataAttributes}>
                    {item && (
                        <div className='col-12' key={item.Id}>
                            <span className="badge  mb-2" style={{ backgroundColor: item.TagColor }}>{item.Tag}</span>
                            <header >
                                <h3 className='title'>{item.Title}</h3>
                            </header>
                            <figure className='figure'>
                            <img className="image shadow"  src={img?.value[0].Url} alt="noticias" />

                            </figure>
                            <div className='text-end'>
                                <span className="mb-2 text-end date " >{moment(item.DateInit).format('D [de] MMMM, YYYY - HH[h]mm')}</span>
                            </div>
                         

                            <div  title={item.Content} id='notice-content' className="mt-3 descripcion">{sanitizerHTML(item.Content)} </div>
                            
                        </div>
                    )}
                </div>
            
        
    );
}