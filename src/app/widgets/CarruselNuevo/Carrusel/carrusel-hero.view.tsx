'use client';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

import React from 'react';
import BannerHero from '../../CarruselNuevo/BannerHero';
import { Swiper, SwiperSlide } from 'swiper/react';
import {  Pagination, Navigation, EffectFade } from 'swiper/modules';
import './carrusel-hero.css';
import { LinkModel } from '@progress/sitefinity-widget-designers-sdk';

interface CarruselItem {
    title: string;
    description: string;
    buttonText: string;
    buttonLink: LinkModel;
    imageUrlMovil: string;
    imageUrlDesktop: string;
    imageAlt: string;
}

interface CarruselHeroClientProps {
    items: CarruselItem[];
}

export function CarruselHero({ items }: CarruselHeroClientProps) {
    // Aplica la lógica de ruta relativa para las imágenes
    const itemsOptimized = items.map(item => {
        let imageUrlMovil = item.imageUrlMovil;
        let imageUrlDesktop = item.imageUrlDesktop;
        if (imageUrlMovil && imageUrlMovil.startsWith('http')) {
            const urlObj = new URL(imageUrlMovil);
            imageUrlMovil = urlObj.pathname + urlObj.search;
        }
        if (imageUrlDesktop && imageUrlDesktop.startsWith('http')) {
            const urlObj = new URL(imageUrlDesktop);
            imageUrlDesktop = urlObj.pathname + urlObj.search;
        }
        return {
            ...item,
            imageUrlMovil,
            imageUrlDesktop
        };
    });
    return (
        <div className='row'>
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                loop={true}
                navigation={false}
                effect={'fade'}
                modules={[EffectFade, Pagination, Navigation]}
                className='mySwiper'
                wrapperClass='z-0!'
            >
                {itemsOptimized.map((item, index) => (
                    <SwiperSlide key={index} className=''>
                        <BannerHero
                            title={item.title}
                            description={item.description}
                            buttonText={item.buttonText}
                            buttonLink={item.buttonLink}
                            imageUrlMovil={item.imageUrlMovil}
                            imageUrlDesktop={item.imageUrlDesktop}
                            imageAlt={item.imageAlt}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
