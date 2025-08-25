'use client';
import React, { useEffect, useState } from 'react';
import { WidgetContext, htmlAttributes } from '@progress/sitefinity-nextjs-sdk';
import { BannerImgEntity } from './bannerImg.entity';
import './bannerImg.css'

interface ImagenData {
    Title: string;
    Url: string;
}

export function BannerImg(props: WidgetContext<BannerImgEntity>) {
    const dataAttributes = htmlAttributes(props);
    const imagenId = props.model.Properties.Imagen?.ItemIdsOrdered?.[0];
    const texto = props.model.Properties.Texto;

    const [imagen, setImagen] = useState<ImagenData | null>(null);

    useEffect(() => {
        if (!imagenId) return;

        const fetchImage = async () => {
            try {
                const response = await fetch(`/api/default/images(${imagenId})`);
                const data = await response.json();
                setImagen(data);
            } catch (error) {
                console.error('Error al cargar imagen:', error);
            }
        };

        fetchImage();
    }, [imagenId]);

    return (
        <div
            {...dataAttributes}
            className='banner-container'
        >
            <div className='block-image'>{imagen && <img src={imagen.Url} alt={imagen.Title} />}</div>
            <div className='block-text'>
                <p className='titulo-banner'>{texto}</p>
            </div>
        </div>
    );
}
