'use client';
import './carrusel-areas.css';
import { useState } from 'react';
import {
    CardItemModel,
} from '@progress/sitefinity-nextjs-sdk/widgets';
import React from 'react';
import {sanitizerHTML} from "../../../utils/Sanitizer"


interface CardsListClientProps {
    initialItems: CardItemModel[];
    contentListAttributes: any;
}

export function CardListAreasClient({ initialItems, contentListAttributes }: CardsListClientProps) {
    const [items, setItems] = useState<CardItemModel[]>(initialItems);
  

    const getHrefFromString = (stringData: string) => {
        try {
            const parsedData = JSON.parse(stringData);
            if (Array.isArray(parsedData) && parsedData.length > 0) {
                return parsedData[0].href;
            }
            return null;
        } catch (error) {
            console.error('Error al parsear JSON:', error);
            return null;
        }
    };

    const renderCard = (item: CardItemModel, index: number) => {
        const sanitizedContent = sanitizerHTML(item.Original.Content);
        return (
            <div key={index} className=' card-container'>
                <div className='card-body'>
                 
                    <h3 className='card-title tituloBienesta '>{item.Original.Title}</h3>

                    <div
                        title={typeof sanitizedContent === 'string' ? sanitizedContent : undefined}          
                        className='card-text textoBienestar '

                    >{sanitizedContent}</div>


                     {item.Original.Redirect &&(
                        <a href={getHrefFromString(item.Original.Redirect)} className='url-redirecion'>
                            {item.Original.BadgeText ? item.Original.BadgeText : 'Ver más '}
                        </a>
                    )}
                    
                </div>
            </div>
        );
    };

    return (
        <div
            style={{ 
                width: '100%', 
                height: 'auto', 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center',
                padding: '20px'
            }}
            {...contentListAttributes}
        >
            <div className='conetenedorBienestar row row-cols-1 row-cols-md-3'>
                {items.map((item, index) => renderCard(item, index))}
            </div>
        </div>
    );
}
