'use client';
import React, { useEffect, useState } from 'react';
import { WidgetContext, htmlAttributes } from '@progress/sitefinity-nextjs-sdk';
import { BannerImgEntityv2 } from './bannerImg.entity';
import './bannerImg.css';

interface ImagenData {
    Title: string;
    Url: string;
}

export function BannerImgv2(props: WidgetContext<BannerImgEntityv2>) {
    const dataAttributes = htmlAttributes(props);
    const imagenId = props.model.Properties.Imagen?.ItemIdsOrdered?.[0];
    const titulo = props.model.Properties.Titulo;
    const SubTitulo = props.model.Properties.Subtitulo;
    const nombres = props.model.Properties.Nombres;
    const cargo = props.model.Properties.Cargo;

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
        <div {...dataAttributes} className='banner-containerv2 row'>
            <div className='block-imagev2'>
                {imagen && <img style={{height:'100%'}} src={imagen.Url} alt={imagen.Title} />}
                <div className='text-overlayv2'>
                    <p className='etiqueta-titulo-bannerv2'>{nombres}</p>
                    <p className='etiqueta-subtitulo-bannerv2'>{cargo}</p>
                </div>
            </div>
            <div className='block-textv2'>
                <p className='titulo-bannerv2'>{titulo}</p>
                <p className='subtitulo-bannerv2'>{SubTitulo}</p>
            </div>
        </div>
    );
}
