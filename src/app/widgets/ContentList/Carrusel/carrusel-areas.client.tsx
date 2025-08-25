'use client';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import './carrusel-areas.css';
import {  useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import {  FreeMode, EffectFade, Navigation } from 'swiper/modules';
import { CardItemModel} from '@progress/sitefinity-nextjs-sdk/widgets';
import {sanitizerHTML} from "../../../utils/Sanitizer";

interface CardsListClientProps {
    initialItems: CardItemModel[];
    contentListAttributes: any;
}

export function CarouselAreasClient({
    initialItems,
    contentListAttributes
}: CardsListClientProps) {
   
    const [items, setItems] = useState<CardItemModel[]>(initialItems);

    const links = [
        'http://localhost:5001/bienestar-social-y-servicios-al-personal',
        'http://localhost:5001/salud-ocupacional',
        'http://localhost:5001/gestion-de-compensaci%C3%B3n',
        'http://localhost:5001/gestion-de-desarrollo'
    ]

    return (
        <div {...contentListAttributes} className='carrousel-areas'>
            <div className='container-cards '>
                <Swiper
                    spaceBetween={0}
                    slidesPerView={3}
                    centeredSlides={false}
                    freeMode={true}
                    loop={false}
                    navigation={true}
                    modules={[EffectFade, Navigation, FreeMode]}
                    className="classic-swiper swiper-areas"
                    wrapperClass="!w-[1090px]"
                >
                    {items.map((item, idx) => {
                        // (item.Original.ActionLink?.href || '')
                        return (
                            
                            <SwiperSlide key={idx} style={{ background: 'transparent' }} className='!w-[399px]'>
                                <div className='carrousel-card'>
                                    <h3><a href={links[idx]}>{item.Original.Title}</a></h3>  
                                    
                                    <div className='separator'></div>
 
                                    
                                    <p
                                        title={item.Original.Content}
                                        className='contenido-card'
                                    >
                                    {sanitizerHTML(item.Original.Content)}
                                    </p>
                                </div>
                            </SwiperSlide>

                        );
                    })}
                  
                </Swiper>
            </div>
        </div>
    );
}

