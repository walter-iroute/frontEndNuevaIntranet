'use client';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import './carrusel-areas.css';
import { useState } from 'react';

import {
    CardItemModel,

} from '@progress/sitefinity-nextjs-sdk/widgets';
import React from 'react';


interface CardsListClientProps {
    initialItems: CardItemModel[];
    contentListAttributes: any;
}
import {sanitizerHTML} from "../../../utils/Sanitizer";



export function CarouselAreasClient({ initialItems, contentListAttributes }: CardsListClientProps) {
    const [items, setItems] = useState<CardItemModel[]>(initialItems);
    return (
        <div {...contentListAttributes} className='carrousel-areas'>
            <div className='container-cards '>
                {items.map((item, idx) => {
                    // (item.Original.ActionLink?.href || '')
                    return (
                        <div style={{textAlign: 'center', padding: '0.5rem'}} className='contenedor-card'>
                            <p className='titulo-widget'>
                               {item.Original.Title}
                            </p>

                             <p
                                        title={item.Original.Content}
                                        className='contenido-card'
                                    >
                                    {sanitizerHTML(item.Original.Content)}
                                    </p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
