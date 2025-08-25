'use client';
import React, { useEffect, useState } from 'react';
import { WidgetContext, htmlAttributes } from '@progress/sitefinity-nextjs-sdk';
import { BannerImgEntityv4 } from './bannerImg.entity';
import './bannerImg.css';

interface ImagenData {
    Title: string;
    Url: string; 
}

export function BannerImgv4(props: WidgetContext<BannerImgEntityv4>) {
    const dataAttributes = htmlAttributes(props);
    const imagenId = props.model.Properties.Imagen?.ItemIdsOrdered?.[0];
    const titulo = props.model.Properties.Titulo;
    const SubTitulo = props.model.Properties.Subtitulo;


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
        <div {...dataAttributes} className='banner-containerv4 row'>
            <div className='block-imagev4'>
                {imagen && <img style={{height:'100%', width: '100%' , objectFit:'cover', objectPosition:'center'}} src={imagen.Url} alt={imagen.Title} />}
            </div>
            <div className='block-textv4'>
                <p className='titulo-bannerv4'>{titulo}</p>
                <p className='subtitulo-bannerv4'>{SubTitulo}</p>
            </div>
        </div>
    );
}
