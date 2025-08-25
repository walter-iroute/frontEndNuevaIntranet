'use client'
import { CardItemModel, CardsListViewProps, ContentListEntity } from '@progress/sitefinity-nextjs-sdk/widgets'
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import './carrusel-recursos.css';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';

export function CarruselRecursosView(props: CardsListViewProps<ContentListEntity>) {
    const items = [...props?.items]; 

    const contentListAttributes = props.attributes;
    const classAttributeName = contentListAttributes['class'] ? 'class' : 'className';
    contentListAttributes[classAttributeName] += ' row row-cols-1 row-cols-md-3';
    contentListAttributes[classAttributeName] = contentListAttributes[classAttributeName].trim();

    (items)
    return (
        <div {...contentListAttributes} className='flex justify-center carrusel-recursos-container'>
            <Swiper 
                modules={[Navigation]}
                slidesPerView={3}
                spaceBetween={0}
                navigation
                loop={false}
                className='productos-swiper'
            >
                <div className='flex w-full justify-center'>
                    {items.map((item, index) => (
                        <SwiperSlide key={index}>
                            <Card item={item} />
                        </SwiperSlide>
                    ))}
                </div>
            </Swiper>
        </div>
    )
}

// Exportar el componente para su uso
interface CardProps {
    item: CardItemModel;
    isActive?: boolean;
}

const Card = ({ 
    item, 
    isActive = false, 
}: CardProps) => {
    const Orig = item.Original;
    const titulo = Orig.Title; 

    // (item.Original.Img[0].Url)
    // ('Orig', Orig)
    let imageUrl = item.Original.Img[0].Url;


    return (
        <div 
            className={`
                recursos-card flex p-2 h-[193px]  cursor-pointer border-b-2 border-white 2xl:h-[74px]
                ${isActive ? '!border-[#CB801B]' : ''}
            `}
        >
            <div 
                className="carrusel-recursos-icon"                   
            >
                <img src={imageUrl} alt=""/>
            </div>
            
            <div className='prod-rel-text'>
                <p 
                >
                    {titulo || 'Sin título'}
                </p>
            </div>
        </div>
    );
};