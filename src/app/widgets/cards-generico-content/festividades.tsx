'use client';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import '../carrusel/carrusel.css';
import './festividades.css';
import { useEffect, useState } from 'react';
import { WidgetContext, htmlAttributes } from '@progress/sitefinity-nextjs-sdk';
import { ContentListsCommonRestService } from '@progress/sitefinity-nextjs-sdk/widgets';
import { Tracer } from '@progress/sitefinity-nextjs-sdk/diagnostics/empty';
import { GenericoWidgetEntityContent } from './festividades.entity';
import React from 'react';
import moment from 'moment';
import 'moment/locale/es';

export function GenericoWidgetContent(props: WidgetContext<GenericoWidgetEntityContent>) {
    const [items, setItems] = useState<any[]>([]);
    const [icono, setIcono] = useState<string>('cumpleaños');
 
    const dataAttributes = htmlAttributes(props);;
    const {  ctx } = Tracer.traceWidget(props, true);
    const context = props.requestContext;
    moment.locale('es');
    useEffect(() => {
        const fetchItems = async () => {
            try {
                const lists = await ContentListsCommonRestService.getItems(
                    props.model.Properties,
                    props.requestContext.detailItem,
                    context,
                    0,
                    ctx,
                    false,
                );
                setItems(lists.Items);
              
            } catch (error) {
                console.error('Error fetching items:', error);
            }
        };

        fetchItems();
    }, [icono]);

    // Agrupar los items en filas de máximo 3
    const rows = [];
    for (let i = 0; i < items.length; i += 3) {
        rows.push(items.slice(i, i + 3));
    }

    return (
        <div
            className="card-generico-content"
            style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
            {...dataAttributes}
        >
            <div className="card-generico-content-items">
                {rows.map((row, rowIndex) => (
                    <div
                        className="card-generico-content-row"
                        key={rowIndex}
                        style={{ display: 'flex', justifyContent: 'center', gap: '2.5rem', width: '100%' }}
                    >
                        {row.map((item) => {
                            const hasImage = Array.isArray(item.Img) && item.Img.length > 0;
                            const imageUrl = hasImage ? item.Img[0].Url : '/assets/checker.png';
                            const imageAlt = hasImage ? item.Img[0].AlternativeText || 'Image' : 'Image';
                            const imageTitle = hasImage ? item.Img[0].Title || 'Image' : 'Image';
                            return (
                                <div className='card-container-hhrr' key={item.Id}>
                                    <div className='empty-card-hhrr'>
                                        <img src={imageUrl}  title={imageTitle} alt={imageAlt} />
                                        <h3>{item.Title}</h3>
                                        <div
                                            style={{
                                                display: '-webkit-box',
                                                WebkitLineClamp: 7,
                                                WebkitBoxOrient: 'vertical',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                whiteSpace: 'pre-line',
                                            }}
                                            dangerouslySetInnerHTML={{ __html: item.Content }}
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>
        </div>
    );
}
