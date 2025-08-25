'use client';
import React, { useEffect, useState } from 'react';
import { WidgetContext, htmlAttributes } from '@progress/sitefinity-nextjs-sdk';
import { BannerImgEntitycontenidov2 } from './bannerImg.entity';
import './bannerImg.css';

interface ImagenData {
    Title: string;
    Url: string;
}

export function BannerImgcontenidov2(props: WidgetContext<BannerImgEntitycontenidov2>) {
    const dataAttributes = htmlAttributes(props);
    const imagenId = props.model.Properties.Imagen?.ItemIdsOrdered?.[0];
    const titulo = props.model.Properties.Titulo;
    const tituloDuplet = props.model.Properties.TituloDuplet;
    const SubTitulo = props.model.Properties.Subtitulo;
    const SubTitulobold = props.model.Properties.Subtitulobold;
    const item1 = props.model.Properties.item1;
    const item2 = props.model.Properties.item2;
    const item3 = props.model.Properties.item3;
    const item4 = props.model.Properties.item4;
    const item5 = props.model.Properties.item5;
    const item6 = props.model.Properties.item6;
    const item7 = props.model.Properties.item7;
    const item8 = props.model.Properties.item8;
    const item9 = props.model.Properties.item9;
    const item10 = props.model.Properties.item10;
    const link = props.model.Properties.link;
    const text = props.model.Properties.text_button;
    const subTituloItem = props.model.Properties.SubtituloItem;

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
        <div {...dataAttributes} className='banner-containercontenidov2 row'>
            <div className='block-textcontenidov2'>
                {titulo && <p className='titulo-bannercontenidov2'>{titulo}</p>}

                {tituloDuplet && <p className='titulo-duplet-bannercontenidov2'>{tituloDuplet}</p>}
                {SubTitulo && <p className='subtitulo-bannercontenidov2'>{SubTitulo}</p>}
                {SubTitulobold && <p className='subtitulo-bannercontenidov22'>{SubTitulobold}</p>}

                {subTituloItem && <p className='subtitulo-item-bannercontenidov2'>{subTituloItem}</p>}

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
                {item7 && <p className='item-bannercontenidov2'>{item7}</p>}
                {item8 && <p className='item-bannercontenidov2'>{item8}</p>}
                {item9 && <p className='item-bannercontenidov2'>{item9}</p>}
                {link && (
                    <a href={link} className='button-generico-verde'>
                        {text}
                    </a>
                )}
            </div>
            <div className='block-imagecontenidov2'>
                {imagen && <img style={{ width: '353px', height:'323px', objectFit: 'contain' }} src={imagen.Url} alt={imagen.Title} />}
            </div>
        </div>
    );
}
