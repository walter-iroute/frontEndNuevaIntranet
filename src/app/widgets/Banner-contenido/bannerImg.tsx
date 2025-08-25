'use client';
import React, { useEffect, useState } from 'react';
import { WidgetContext, htmlAttributes } from '@progress/sitefinity-nextjs-sdk';
import { BannerImgEntitycontenido } from './bannerImg.entity';
import './bannerImg.css';

interface ImagenData {
    Title: string;
    Url: string;
}

export function BannerImgcontenido(props: WidgetContext<BannerImgEntitycontenido>) {
    const dataAttributes = htmlAttributes(props);
    const imagenId = props.model.Properties.Imagen?.ItemIdsOrdered?.[0];
    const titulo = props.model.Properties.Titulo;
    const SubTitulobold1 = props.model.Properties.SubtituloBold1;
    const SubTitulo = props.model.Properties.Subtitulo;
    const item1 = props.model.Properties.item1;
    const item2 = props.model.Properties.item2;
    const item3 = props.model.Properties.item3;
    const item4 = props.model.Properties.item4;
    const item5 = props.model.Properties.item5;
    const item6 = props.model.Properties.item6;
  
    const item10 = props.model.Properties.SubtituloBold;
    const item11 = props.model.Properties.item11;
    const item12 = props.model.Properties.item12;
    const item13 = props.model.Properties.item13;
    const item14 = props.model.Properties.item14;
    const item15 = props.model.Properties.item15;

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
            <div className='block-imagecontenido'>
                {imagen && <img style={{  width: '353px', height:'323px', objectFit: 'contain'}} src={imagen.Url} alt={imagen.Title} />}
            </div>
            <div className='block-textcontenido'>
                <div className='textcontenido'>
                    <p className='titulo-bannercontenido'>{titulo}</p>
                    {SubTitulobold1 && <p className='subtitulo-bannercontenidov22'>{SubTitulobold1}</p>}
                    {SubTitulo && <p className='subtitulo-bannercontenido'>{SubTitulo}</p>}

                    {item1 && (
                    <div className='block-item-textcontenidov2'>
                        {item1 && (
                            <p
                                style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
                                className='item-bannercontenidov2'
                            >
                                {' '}
                                <img style={{ marginRight: '0.5rem' }} src='/assets/arrow-item.png'></img>
                                {item1}
                            </p>
                        )}
                        {item2 && (
                            <p
                                style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
                                className='item-bannercontenidov2'
                            >
                                {' '}
                                <img style={{ marginRight: '0.5rem' }} src='/assets/arrow-item.png'></img>
                                {item2}
                            </p>
                        )}
                        {item3 && (
                            <p
                                style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
                                className='item-bannercontenidov2'
                            >
                                {' '}
                                <img style={{ marginRight: '0.5rem' }} src='/assets/arrow-item.png'></img>
                                {item3}
                            </p>
                        )}
                        {item4 && (
                            <p
                                style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
                                className='item-bannercontenidov2'
                            >
                                {' '}
                                <img style={{ marginRight: '0.5rem' }} src='/assets/arrow-item.png'></img>
                                {item4}
                            </p>
                        )}
                        {item5 && (
                            <p
                                style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
                                className='item-bannercontenidov2'
                            >
                                {' '}
                                <img style={{ marginRight: '0.5rem' }} src='/assets/arrow-item.png'></img>
                                {item5}
                            </p>
                        )}
                        {item6 && (
                            <p
                                style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
                                className='item-bannercontenidov2'
                            >
                                {' '}
                                <img style={{ marginRight: '0.5rem' }} src='/assets/arrow-item.png'></img>
                                {item6}
                            </p>
                        )}
                    </div>
                )}

                   
                    {item10 && <p className='subtitulo-bannercontenidov22'>{item10}</p>}
                    {item11 && <p className='subtitulo-bannercontenidov2'>{item11}</p>}
                    {item12 && <p className='subtitulo-bannercontenidov2'>{item12}</p>}
                    {item13 && <p className='subtitulo-bannercontenidov2'>{item13}</p>}
                    {item14 && <p className='subtitulo-bannercontenidov2'>{item14}</p>}
                    {item15 && <p className='subtitulo-bannercontenidov2'>{item15}</p>}
                </div>
            </div>
        </div>
    );
}
