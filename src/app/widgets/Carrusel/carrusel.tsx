'use client';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import '../carrusel/carrusel.css';
import './carrusel.css';
import { useEffect, useState, useRef, useCallback } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, FreeMode, EffectFade, Autoplay, Navigation } from 'swiper/modules';
import { WidgetContext, htmlAttributes } from '@progress/sitefinity-nextjs-sdk';
import { ContentListsCommonRestService } from '@progress/sitefinity-nextjs-sdk/widgets';
import { Tracer } from '@progress/sitefinity-nextjs-sdk/diagnostics/empty';
import { CarouselWidgetEntity } from './carrusel.entity';
import React from 'react';
import moment from 'moment';
import 'moment/locale/es';
import {sanitizerHTML} from "../../utils/Sanitizer"

export function CarouselWidget(props: WidgetContext<CarouselWidgetEntity>) {
    const [items, setItems] = useState<any[]>([]);
    const [icono, setIcono] = useState<string>('cumpleaños');
    const dataAttributes = htmlAttributes(props);
    const infinte = props.model?.Properties?.Infinite;
    const navegacion: boolean = true;
    const cardMode = props.model?.Properties?.CardMode;
    const {  ctx } = Tracer.traceWidget(props, true);
    const context = props.requestContext;
    moment.locale('es');
    const [swiperInstance, setSwiperInstance] = useState<any>(null);


    const prevRef = useRef<HTMLButtonElement>(null);
    const nextRef = useRef<HTMLButtonElement>(null);


    function limitText(text: string, limit: number) {
        return text && text.length > limit ? text.substring(0, limit) + '...' : text || '';
    }


    const getHrefFromString = (stringData: string) => {
        try {
            const parsedData = JSON.parse(stringData);

            // Verificar que sea un array y tenga elementos
            if (Array.isArray(parsedData) && parsedData.length > 0) {
                return parsedData[0].href;
            }

            return null;
        } catch (error) {
            console.error('Error al parsear JSON:', error);
            return null;
        }
    };

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

    const shouldCenterSlides = items.length <= 3;
     // Función para manejar navegación manualmente
        const handlePrevClick = useCallback(() => {
            if (swiperInstance) {
                swiperInstance.slidePrev();
            }
        }, [swiperInstance]);
    
        const handleNextClick = useCallback(() => {
            if (swiperInstance) {
                swiperInstance.slideNext();
            }
        }, [swiperInstance]);
    
   const handleSwiperInit = useCallback((swiper: any) => {
        setSwiperInstance(swiper);

        // Asegurar que los botones estén disponibles
        if (prevRef.current && nextRef.current) {
            prevRef.current.onclick = () => swiper.slidePrev();
            nextRef.current.onclick = () => swiper.slideNext();
        }
    }, []);
  
    return (
        <div
            style={{ height: '350px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            {...dataAttributes}
        >
            {items.length > 3 ? (
                <div style={{ position: 'relative', padding: '0 60px' }}>
                    {/* Padding para los botones */}
                    <Swiper
                        spaceBetween={10}
                        slidesPerView={3}
                        centeredSlides={shouldCenterSlides}
                        autoplay={{
                            delay: 2000,
                            disableOnInteraction: false,
                        }}
                        freeMode={true}
                        loop={infinte}
                        modules={[EffectFade, Autoplay, Pagination, Navigation, FreeMode]}
                        className='swiper-wrapper-custom'
                           
                        onSwiper={handleSwiperInit}
                        navigation={{
                            prevEl: prevRef.current,
                            nextEl: nextRef.current,
                        }}
                    >
                        {items.map((item, index) => {
                            const hasImage = Array.isArray(item.Img) && item.Img.length > 0;
                            const imageUrl = hasImage ? item.Img[0].Url : '/assets/checker.png';
                            const imageAlt = hasImage ? item.Img[0].AlternativeText || 'Image' : 'Image';
                            const imageTitle = hasImage ? item.Img[0].Title || 'Image' : 'Image';

                            return (
                                <SwiperSlide key={index}>
                                    <a
                                        href={`/detalle-noticia?id=${item.Id}`}
                                        className='text-decoration-none'
                                        rel='noopener noreferrer'
                                    >
                                        <div
                                            className={`${cardMode ? 'card noticias mb-5' : ''} card-container-noticias`}
                                        >
                                            <img
                                                src={imageUrl}
                                                alt={imageAlt}
                                                title={imageTitle}
                                                style={{
                                                    backgroundColor: '#EDEDEE',
                                                    objectFit: 'cover',
                                                    height: '225px',
                                                    width: '100%',
                                                    borderTopRightRadius: '5px',
                                                    borderTopLeftRadius: '5px',
                                                }}
                                            />
                                            <div className={cardMode ? 'card-body text-start' : 'text-start'}>
                                                {item.Tag && (
                                                    <span
                                                        className='badge badge-danger mb-2'
                                                        style={{
                                                            backgroundColor: item.TagColor || '#dc3545',
                                                            fontWeight: 600,
                                                            borderRadius: 20,
                                                        }}
                                                    >
                                                        {item.Tag}
                                                    </span>
                                                )}
                                                <p
                                                    className={cardMode ? 'card-title' : ''}
                                                    title={item.Title}
                                                    style={{
                                                        color: '#474747',
                                                        fontWeight: 600,
                                                        fontSize: '18px',
                                                        lineHeight: '117.4%',
                                                    }}
                                                >
                                                    {limitText(item.Title, 65)}
                                                </p>
                                            </div>
                                        </div>
                                    </a>
                                </SwiperSlide>
                            );
                        })}
                    </Swiper>
                    {/* Botones de navegación personalizados */}

                    {navegacion && (
                        <>
                            <button
                                ref={prevRef}
                                className='arrow2 arrow2--prev1'
                                aria-label='Elemento anterior'
                                onClick={handlePrevClick}
                            ></button>
                            <button
                                ref={nextRef}
                                className='arrow2 arrow2--next1'
                                aria-label='Elemento siguiente'
                                onClick={handleNextClick}
                            ></button>
                        </>
                    )}
                </div>
            ) : (
                <div className='swiper-wrapper-custom'>
                    {items.map((item, index) => {
                        const hasImage = Array.isArray(item.Img) && item.Img.length > 0;
                        const imageUrl = hasImage ? item.Img[0].Url : '/assets/checker.png';
                        const imageAlt = hasImage ? item.Img[0].AlternativeText || 'Image' : 'Image';
                        const imageTitle = hasImage ? item.Img[0].Title || 'Image' : 'Image';

                        return (
                            <div className='card-container'>
                                <div className='empty-card' key={item.Id}>
                                    <img 
                                      src={imageUrl}
                                                alt={imageAlt}
                                                title={imageTitle}
                                     />

                                    <h3>{item.Title}</h3>

                                    <p
                                        title={item.Content}
                                        className='contenido-card'
                                    >
                                    {sanitizerHTML(item.Content)}
                                    </p>

                                    <a href={getHrefFromString(item.Redirect)} className='url-redirecion'>
                                        {item.BadgeText ? item.BadgeText : 'Conoce más'}
                                    </a>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
