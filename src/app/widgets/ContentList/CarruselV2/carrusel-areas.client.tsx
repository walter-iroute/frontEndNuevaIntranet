'use client';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import './carrusel-areas.css';
import { useEffect, useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, FreeMode, EffectFade, Autoplay, Navigation } from 'swiper/modules';
import {
    CardItemModel,

} from '@progress/sitefinity-nextjs-sdk/widgets';
import React from 'react';
import { sanitizerHTML } from '../../../utils/Sanitizer';

interface CardsListClientProps {
    initialItems: CardItemModel[];
    contentListAttributes: any;
}

export function CarouselAreasClient({ initialItems, contentListAttributes }: CardsListClientProps) {
    const [items, setItems] = useState<CardItemModel[]>(initialItems);
    const [swiper, setSwiper] = useState<any>(null);
    const navegacion: boolean = true;

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

    const prevRef = useRef<HTMLButtonElement>(null);
    const nextRef = useRef<HTMLButtonElement>(null);

    // Configurar navegación después de que Swiper esté inicializado
    useEffect(() => {
        if (swiper && prevRef.current && nextRef.current) {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
            swiper.navigation.init();
            swiper.navigation.update();
        }
    }, [swiper]);

    const renderCard = (item: CardItemModel, index: number) => {
        const hasImage = Array.isArray(item.Original.Img) && item.Original.Img.length > 0;
        const imageUrl = hasImage ? item.Original.Img[0].Url : '/assets/checker.png';
        const imageAlt = hasImage ? item.Original.Img[0].AlternativeText || 'Image' : 'Image';
        const sanitizedContent = sanitizerHTML(item.Original.Content);



        return (
            <div key={index} className='card-container'>
                <div className='empty-card' >
                    {imageUrl ? (
                        <img src={imageUrl} alt={imageAlt} />
                    ) : (
                        <div style={{ ...styles.icon, backgroundColor: '#ccc' }} />
                    )}

                    <h3>{item.Original.Title}</h3>

                    <p
                        title={typeof sanitizedContent === 'string' ? sanitizedContent : undefined} 
                        className='contenido-card'
                    > {sanitizedContent}</p>

                    {item.Original.Redirect ? (
                        <a href={getHrefFromString(item.Original.Redirect)} className='url-redirecion'>
                            {item.Original.BadgeText ? item.Original.BadgeText : 'Conoce más'}
                        </a>
                    ): (
                        <div style={{ ...styles.linkText, backgroundColor: '#ccc' }} />
                    )}
                    
                </div>
            </div>
        );
    };

    return (
        <div
            style={{ width: 'auto', height: 'auto', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            {...contentListAttributes}
        >
            {items.length > 3 ? (
                <div style={{ width: 'auto', position: 'relative', padding: '0 60px' }}>
                    <Swiper
                        spaceBetween={10}
                        slidesPerView={3}
                        freeMode={true}
                        modules={[EffectFade, Autoplay, Pagination, Navigation, FreeMode]}
                        className='swiper-wrapper-custom'
                        onSwiper={setSwiper}
                        navigation={false} // Deshabilitamos la navegación por defecto
                    >
                        {items.map((item, index) => (
                            <SwiperSlide key={index}>{renderCard(item, index)}</SwiperSlide>
                        ))}
                    </Swiper>

                    {/* Botones de navegación personalizados */}
                    {navegacion && (
                        <>
                            <button
                                ref={prevRef}
                                className='arrow2 arrow2--prev1'
                                aria-label='Elemento anterior'
                                onClick={() => swiper?.slidePrev()}
                            />
                            <button
                                ref={nextRef}
                                className='arrow2 arrow2--next1'
                                aria-label='Elemento siguiente'
                                onClick={() => swiper?.slideNext()}
                            />
                        </>
                    )}
                </div>
            ) : (
                <div
                    className='swiper-wrapper-custom'
                    style={{ display: 'flex', gap: '10px', justifyContent: 'center', alignItems: 'center' }}
                >
                    {items.map((item, index) => renderCard(item, index))}
                </div>
            )}
        </div>
    );
}

const styles = {
    icon: {
        width: '40px',
        height: '40px',
        borderRadius: '10%',
    },
    linkText: {
        height: '16px',
        borderRadius: '10%',
    },
};
