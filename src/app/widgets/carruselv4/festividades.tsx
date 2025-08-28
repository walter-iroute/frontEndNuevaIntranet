'use client';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import '../carrusel/carrusel.css';
import './festividades.css';
import { useEffect, useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, FreeMode, EffectFade, Autoplay, Navigation } from 'swiper/modules';
import { WidgetContext, htmlAttributes } from '@progress/sitefinity-nextjs-sdk';
import { ContentListsCommonRestService } from '@progress/sitefinity-nextjs-sdk/widgets';
import { Tracer } from '@progress/sitefinity-nextjs-sdk/diagnostics/empty';
import { GenericoWidgetEntity } from './festividades.entity';
import React from 'react';
import moment from 'moment';
import 'moment/locale/es';
import { sanitizerHTML } from "../../utils/Sanitizer";

export function GenericoWidget(props: WidgetContext<GenericoWidgetEntity>) {
    const [items, setItems] = useState<any[]>([]);
    const [icono, setIcono] = useState<string>('cumpleaños');
    const dataAttributes = htmlAttributes(props);
    const infinte = props.model?.Properties?.Infinite;
    const navegacion: boolean = true;
    const { ctx } = Tracer.traceWidget(props, true);
    const context = props.requestContext;
    moment.locale('es');

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

    // Componente reutilizable para renderizar una tarjeta
    const CardItem = ({ item }: { item: any }) => {
        const hasImage = Array.isArray(item.Img) && item.Img.length > 0;
        const imageUrl = hasImage ? item.Img[0].Url : '/assets/checker.png';
        const imageAlt = hasImage ? item.Img[0].AlternativeText || 'Image' : 'Image';
        const imageTitle = hasImage ? item.Img[0].Title || 'Image' : 'Image';

        return (
            <div className='card-container'>
                <div className='empty-card'>
                    <img src={imageUrl} title={imageTitle} alt={imageAlt} />
                    <h3>{item.Title}</h3>
                    <p title={item.Content} className="contenido-card">
                        {sanitizerHTML(item.Content)}
                    </p>
                    {item.Redirect && (
                        <a href={getHrefFromString(item.Redirect)} className='url-redirecion'>
                            {item.BadgeText ? item.BadgeText : 'Conoce más'}
                        </a>
                    )}
                </div>
            </div>
        );
    };

    const shouldCenterSlides = items.length <= 3;
    const prevRef = useRef(null);
    const nextRef = useRef(null);

    return (
        <div
            style={{ height: '350px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            {...dataAttributes}
        >
            {items.length > 3 ? (
                <div style={{ position: 'relative', padding: '0 60px' }}>
                    <Swiper
                        spaceBetween={10}
                        slidesPerView={3}
                        centeredSlides={shouldCenterSlides}
                        freeMode={true}
                        loop={infinte}
                        modules={[EffectFade, Autoplay, Pagination, Navigation, FreeMode]}
                        className='swiper-wrapper-custom'
                        navigation={{
                            prevEl: prevRef.current,
                            nextEl: nextRef.current,
                        }}
                    >
                        {items.map((item, index) => (
                            <SwiperSlide key={item.Id || index}>
                                <CardItem item={item} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    
                    {navegacion && (
                        <>
                            <button
                                ref={prevRef}
                                className='arrow2 arrow2--prev1'
                                aria-label='Elemento anterior'
                            />
                            <button
                                ref={nextRef}
                                className='arrow2 arrow2--next1'
                                aria-label='Elemento siguiente'
                            />
                        </>
                    )}
                </div>
            ) : (
                <div className='swiper-wrapper-custom'>
                    {items.map((item, index) => (
                        <CardItem key={item.Id || index} item={item} />
                    ))}
                </div>
            )}
        </div>
    );
}