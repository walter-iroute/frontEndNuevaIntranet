'use client';
import React, { useEffect, useState } from 'react';
import { WidgetContext, htmlAttributes } from '@progress/sitefinity-nextjs-sdk';
import { BannerImgEntitycontenidohhrrRigth } from './bannerImg.entity';
import './bannerImg.css';

interface ImagenData {
    Title: string;
    Url: string;
}

export function BannerImgcontenidohhrrRigth(props: WidgetContext<BannerImgEntitycontenidohhrrRigth>) {
    const dataAttributes = htmlAttributes(props);
    
    // Destructuring directo de todas las propiedades
    const {
        Imagen,
        Titulo,
        SubtituloBold1,
        Subtitulo,
        item1,
        item2,
        item3,
        alignImage,
        itemTitulo,
        itemContenido
    } = props.model.Properties;

    const imagenId = Imagen?.ItemIdsOrdered?.[0];
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
        <div {...dataAttributes} className='banner-containercontenido row'>
            <div style={{alignItems: (alignImage as React.CSSProperties['alignItems']) || 'center'}} className='block-imagecontenido-hhrr-rigth'>
                {imagen && (
                    <img
                        style={{ width: '353px', height: '323px', objectFit: 'cover' }}
                        src={imagen.Url}
                        alt={imagen.Title}
                    />
                )}
            </div>
            <div className='block-textcontenido'>
                <div className='textcontenido'>
                    <p className='titulo-bannercontenido'>{Titulo}</p>
                    {Subtitulo && <p className='subtitulo-bannercontenido'>{Subtitulo}</p>}
                    {SubtituloBold1 && <p className='subtitulo-bannercontenidov22'>{SubtituloBold1}</p>}
                    {itemTitulo && (
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <img
                                style={{ marginRight: '0.5rem', height: '42px', width: '42px', objectFit: 'cover' }}
                                src='/assets/phone.png'
                            />
                            <p className='itemTituloContenido'>
                                <strong style={{fontWeight:'700'}}>{itemTitulo}</strong> {itemContenido} 
                            </p>
                        </div>
                    )}

                    {item1 && (
                        <div className='block-item-textcontenidov2'>
                            {[item1, item2, item3].filter(Boolean).map((item, index) => (
                                <p
                                    key={index}
                                    style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
                                    className='item-bannercontenidov2'
                                >
                                    <img style={{ marginRight: '0.5rem' }} src='/assets/circle-line.svg' />
                                    {item}
                                </p>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}