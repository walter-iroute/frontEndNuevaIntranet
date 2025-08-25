'use client';
import { CardItemModel, CardsListViewProps, ContentListEntity } from '@progress/sitefinity-nextjs-sdk/widgets';
import React from 'react';
import { useRef, useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, FreeMode, EffectFade, Autoplay, Navigation } from 'swiper/modules';

import './productos-relacionados.css';
import 'swiper/css';
import 'swiper/css/navigation';

export function CarruselProductoRelacionadosView(props: CardsListViewProps<ContentListEntity>) {
    const items = [...props?.items];
    const navegacion: boolean = true;
    const [swiper, setSwiper] = useState<any>(null);

    const contentListAttributes = props.attributes;
    const classAttributeName = contentListAttributes['class'] ? 'class' : 'className';
    contentListAttributes[classAttributeName] += ' row row-cols-1 row-cols-md-3';
    contentListAttributes[classAttributeName] = contentListAttributes[classAttributeName].trim();

    const prevRef = useRef<HTMLButtonElement>(null);
    const nextRef = useRef<HTMLButtonElement>(null);
    (items);


    useEffect(() => {
            if (swiper && prevRef.current && nextRef.current) {
                swiper.params.navigation.prevEl = prevRef.current;
                swiper.params.navigation.nextEl = nextRef.current;
                swiper.navigation.init();
                swiper.navigation.update();
            }
        }, [swiper]);
    return (
        <div {...contentListAttributes} className='flex justify-center prod-rel-container relative'>
            <Swiper
                modules={[EffectFade, Autoplay, Pagination, Navigation, FreeMode]}
                slidesPerView={3}
                spaceBetween={10}
                freeMode={true}
                navigation={false}
                loop={false}
                onSwiper={setSwiper}
                className='swiper-wrapper-custom'
            >
                <div className='flex w-full justify-center'>
                    {items.map((item, index) => (
                        <SwiperSlide key={index}>
                            <Card item={item} />
                        </SwiperSlide>
                    ))}
                </div>
            </Swiper>
            {/* Botones de navegación personalizados */}
            {navegacion && (
                <>
                    <button
                        ref={prevRef}
                        className='arrow3 arrow3--prev2'
                        aria-label='Elemento anterior'
                        onClick={() => swiper?.slidePrev()}
                    />
                    <button
                        ref={nextRef}
                        className='arrow3 arrow3--next2'
                        aria-label='Elemento siguiente'
                        onClick={() => swiper?.slideNext()}
                    />
                </>
            )}
        </div>
    );
}

// Exportar el componente para su uso
interface CardProps {
    item: CardItemModel;
    isActive?: boolean;
}

const Card = ({ item, isActive = false }: CardProps) => {
    const Orig = item.Original;
    const titulo = Orig.Title;

    (item.Original.Img[0].Url);
    
    let imageUrl = item.Original.Img[0].Url;

    return (
        <div
            className={`
                prod-rel-card flex p-2 h-[96px]  cursor-pointer border-b-2 border-white hover:!border-[#CB801B] 2xl:h-[74px]
                ${isActive ? '!border-[#CB801B]' : ''}
            `}
        >
            <div className='w-9 h-9 min-w-9 flex items-center justify-center backenground_class_icon prod-rel-img'>
                <img src={imageUrl} alt='' className='w-full h-full object-contain' />
            </div>

            <div className='prod-rel-text'>
                <p className={`md:text-base text-start lg:text-start text-[#474747] m-0 font-bold uppercase`}>
                    {titulo || 'Sin título'}
                </p>
            </div>
        </div>
    );
};
