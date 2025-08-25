'use client';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

import '../carrusel/carrusel.css';
import './plataformas.css';

import { useEffect, useState, useRef } from 'react';
import { Swiper } from 'swiper/react';
import { SwiperSlide } from 'swiper/react';
import { Pagination, FreeMode, EffectFade, Autoplay, Navigation } from 'swiper/modules';
import { WidgetContext, htmlAttributes } from '@progress/sitefinity-nextjs-sdk';
import { ContentListsCommonRestService } from '@progress/sitefinity-nextjs-sdk/widgets';
import { Tracer } from '@progress/sitefinity-nextjs-sdk/diagnostics/empty';
import { PlataformasWidgetEntity } from './plataformas.entity';
import { ListWithCFView } from './views/list-with-cf/list-cf-view';
import { ListWithNoticiasView } from './views/list-with-noticias/list-with-noticias-view';
import { ListWithMercadeoView } from './views/list-with-mercadeo/list-with-mercadeo-view';
import { ListWithRecursosView } from './views/list-with-recursos/list-with-recursos-view';
import { ListWithPlataformasView } from './views/list-with-plataformas/list-with-plataformas-view';
import { ListWithProcesosView } from './views/list-with-procesos/list-with-procesos-view';

export function PlataformasWidget(props: WidgetContext<PlataformasWidgetEntity>) {
    const [listItems, setItems] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [swiperRef, setSwiperRef] = useState<any>(null);
    const dataAttributes = htmlAttributes(props);
    const infinte = props.model?.Properties?.Infinite;
    const navegacion: boolean = true;
    const slidesPerView = props.model?.Properties?.SlidesPerView || 4;
    const spaceBetween = props.model?.Properties?.SpaceBetween;
    const centeredSlides = props.model?.Properties?.CenteredSlides;
    const freeMode = props.model?.Properties?.FreeMode;
    const cardMode = props.model?.Properties?.CardMode;
    const {  ctx } = Tracer.traceWidget(props, true);
    const context = props.requestContext;

    // Calcular el número total de páginas
    const totalPages = Math.ceil(listItems.length / slidesPerView);

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
    }, []);

    // Función para ir a una página específica
    const goToPage = (pageIndex: number) => {
        if (swiperRef) {
            const slideIndex = pageIndex * slidesPerView;
            swiperRef.slideTo(slideIndex);
            setCurrentPage(pageIndex);
        }
    };

    // Manejar el evento de cambio de slide
    const handleSlideChange = (swiper: any) => {
        const newPage = Math.floor(swiper.activeIndex / slidesPerView);
        setCurrentPage(newPage);
    };

    // Función para ir a la página siguiente automáticamente
    const prevRef = useRef(null);
    const nextRef = useRef(null);

    return (
        <div
            style={{ height: '76px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            {...dataAttributes}
        >
            <div style={{ position: 'relative' }}>
                <Swiper
                    spaceBetween={spaceBetween}
                    slidesPerView={slidesPerView}
                    slidesPerGroup={slidesPerView}
                    centeredSlides={centeredSlides}
                    freeMode={freeMode}
                    loop={infinte}
                    navigation={{
                            prevEl: prevRef.current,
                            nextEl: nextRef.current,
                        }}
                    modules={[EffectFade, Autoplay, Pagination, Navigation, FreeMode]}
                    className='classic-swiper carrusel-plataformas'
                    onSwiper={setSwiperRef}
                    onSlideChange={handleSlideChange}
                >
                    {listItems.map((item, index) => {
                        const hasImage = Array.isArray(item.Img) && item.Img.length > 0;
                        const imageUrl = hasImage ? item.Img[0].Url : '/assets/placeholder.png';
                        const imageAlt = hasImage ? item.Img[0].AlternativeText || 'Image' : 'Image';
                        const imageTitle = hasImage ? item.Img[0].Title || 'Image' : 'Image';
                        return (
                            <SwiperSlide key={index} style={{ background: 'transparent' }}>
                                <a href='' className='text-decoration-none' rel='noopener noreferrer'>
                                    <div
                                        className='card-plataforma'
                                        style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
                                    >
                                        <img
                                            className='r img-plataforma'
                                            src={imageUrl}
                                            alt={imageAlt}
                                            title={imageTitle}
                                            style={{ objectFit: 'contain' }}
                                        />
                                        <div className={cardMode ? 'card-body text-start' : 'text-start'}>
                                            <p className='text-plataforma' title={item.Title}>
                                                {item.Title}
                                            </p>
                                        </div>
                                    </div>
                                </a>
                            </SwiperSlide>
                        );
                    })}
                </Swiper>

                {navegacion && (
                        <>
                            <button
                                ref={prevRef}
                                className='arrow3 arrow3--prev2'
                                aria-label='Elemento anterior'
                            ></button>
                            <button
                                ref={nextRef}
                                className='arrow3 arrow3--next2'
                                aria-label='Elemento siguiente'
                            ></button>
                        </>
                    )}
                
                {/* Paginador personalizado */}
                {totalPages > 1 && (
                    <div 
                        className="custom-pagination"
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            gap: '8px',
                            marginTop: '15px'
                        }}
                    >
                        {Array.from({ length: totalPages }, (_, index) => (
                            <button
                                key={index}
                                onClick={() => goToPage(index)}
                                style={{
                                    width: '10px',
                                    height: '10px',
                                    borderRadius: '50%',
                                    border: 'none',
                                    backgroundColor: currentPage === index ? '#295135' : '#ccc',
                                    cursor: 'pointer',
                                    transition: 'background-color 0.3s ease',
                                    outline: 'none'
                                }}
                                onMouseEnter={(e) => {
                                    if (currentPage !== index) {
                                        (e.target as HTMLButtonElement).style.backgroundColor = '#666';
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (currentPage !== index) {
                                        (e.target as HTMLButtonElement).style.backgroundColor = '#ccc';
                                    }
                                }}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}