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
import { GenericoWidgetEntityHHRR } from './festividades.entity';
import React from 'react';
import moment from 'moment';
import 'moment/locale/es';

export function GenericoWidgetHHRR(props: WidgetContext<GenericoWidgetEntityHHRR>) {
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

    return (
        <div
            style={{ height: '246px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap:'1rem' }}
            {...dataAttributes}
        >
                {items.map((item, index) => {
                    const hasImage = Array.isArray(item.Img) && item.Img.length > 0;
                    const imageUrl = hasImage ? item.Img[0].Url : '/assets/checker.png';
                    const imageAlt = hasImage ? item.Img[0].AlternativeText || 'Image' : 'Image';
                    const imageTitle = hasImage ? item.Img[0].Title || 'Image' : 'Image';

                    return (
                        <div className='card-container-hhrr ' key={item.Id}>
                            <div className='empty-card-hhrr'>
                                <img src={imageUrl}  title={imageTitle} alt={imageAlt} />

                                <h3>{item.Title}</h3>
                            </div>
                        </div>
                    );
                })}
        </div>
    );
}
