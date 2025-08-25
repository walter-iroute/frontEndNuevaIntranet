'use client'
import { CardItemModel } from '@progress/sitefinity-nextjs-sdk/widgets';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react'
import { Autoplay, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import './CarruselProducto.css'

// Props usando tipos correctos de Sitefinity
interface CardsListClientProps {
    initialItems: CardItemModel[];
    contentListAttributes: any;
}


const CarruselProductosView = (
{ 
    initialItems, 
    contentListAttributes 
}: CardsListClientProps
) => {
    // Estados usando CardItemModel de Sitefinity
    const [items, setItems] = useState<CardItemModel[]>(initialItems);
    const [activeProduct, setActiveProduct] = useState<CardItemModel | null>(null);
    const [hoveredProduct, setHoveredProduct] = useState<CardItemModel | null>(null);
    const [imagesLoaded, setImagesLoaded] = useState(false);
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
    
    // Referencias para navegación y swiper
    const prevRef = useRef<HTMLButtonElement>(null);
    const nextRef = useRef<HTMLButtonElement>(null);
    const swiperRef = useRef<any>(null);

    // Función para fetch de imágenes - adaptada a CardItemModel
    const fetchImages = async () => {
        try {
            const updatedItems = await Promise.all(
                items.map(async (item) => {
                    // Usar la estructura correcta de CardItemModel
                    if (item.Original.items_cont && item.Original.items_cont.length > 0) {
                        const updatedItemsCont = await Promise.all(
                            item.Original.items_cont.map(async (relatedItem: any) => {
                                try {
                                    const response = await fetch(`/api/default/newsitems(${relatedItem.Id})/Image`);
                                    if (response.ok) {
                                        const data = await response.json();
                                        return { ...relatedItem, image: data.value };
                                    }
                                } catch (error) {
                                    console.error(`Error fetching image for item ${relatedItem.Id}:`, error);
                                }
                                return relatedItem;
                            })
                        );
                        return { 
                            ...item, 
                            Original: { 
                                ...item.Original, 
                                items_cont: updatedItemsCont 
                            } 
                        };
                    }
                    return item;
                })
            );
            
            setItems(updatedItems);
            setImagesLoaded(true);
        } catch (error) {
            console.error('Error fetching images:', error);
            setImagesLoaded(true);
        }
    };

    // Manejar cuando llega al final y necesita reiniciar
    const handleSwiper = (swiper: any) => {
        swiperRef.current = swiper;
        
        if (!swiper || !swiper.params) return;

        if (!swiper.params.navigation) {
            swiper.params.navigation = {};
        }

        swiper.params.navigation.prevEl = prevRef.current;
        swiper.params.navigation.nextEl = nextRef.current;

        swiper.navigation.init();
        swiper.navigation.update();
    };

    // Manejar cambio de slide automático
    const handleSlideChange = (swiper: any) => {
        // Con loop, usar realIndex para obtener el índice real del array
        const newIndex = swiper.realIndex;
       
        setCurrentSlideIndex(newIndex);
        
        // Actualizar el producto activo siempre que no haya hover
        if (!hoveredProduct && items[newIndex]) {
            setActiveProduct(items[newIndex]);
        }
    };

    // Manejadores de eventos - usando CardItemModel
    const handleHover = (product: CardItemModel) => {
        setHoveredProduct(product);
    };

    const handleLeave = () => {
        setHoveredProduct(null);
        // Volver al producto del slide actual
        if (items[currentSlideIndex]) {
            setActiveProduct(items[currentSlideIndex]);
        }
    };

    const handleClick = (product: CardItemModel) => {
        setActiveProduct(product);
        // Ir al slide correspondiente
        const productIndex = items.findIndex(item => item.Original.Id === product.Original.Id);
        if (productIndex !== -1 && swiperRef.current) {
            swiperRef.current.slideToLoop(productIndex); // Usar slideToLoop para loop mode
        }
    };

    // Efectos
    useEffect(() => {
        if (items.length > 0) {
            setActiveProduct(items[0]);
            setCurrentSlideIndex(0);
        }
    }, [items]);

    // Efecto para sincronizar el producto activo con el slide actual
    useEffect(() => {
        if (items.length > 0 && items[currentSlideIndex] && !hoveredProduct) {
            setActiveProduct(items[currentSlideIndex]);
        }
    }, [currentSlideIndex, items, hoveredProduct]);

    useEffect(() => {
        fetchImages();
    }, []);

    // Producto a mostrar
    const displayedProduct = hoveredProduct || activeProduct;

    // Función para determinar si una tarjeta debe estar activa
    const isCardActive = (item: CardItemModel, index: number) => {
        // Si hay hover, solo esa tarjeta está activa
        if (hoveredProduct) {
            return hoveredProduct.Original.Id === item.Original.Id;
        }
        
        // Si no hay hover, la tarjeta activa es la del slide actual
        return index === currentSlideIndex;
    };

    // Loading state
    if (!imagesLoaded && items.length > 0) {
        return (
            <div {...contentListAttributes} className='w-full'>
                <div className='flex justify-center items-center py-8'>
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
                    <span className="ml-2 text-gray-600">Cargando productos...</span>
                </div>
            </div>
        );
    }

    // No items state
    if (items.length === 0) {
        return (
            <div {...contentListAttributes} className='w-full'>
                <div className='text-center py-8'>
                    <p className="text-gray-600">No hay productos disponibles.</p>
                </div>
            </div>
        );
    }

    return (
        <div {...contentListAttributes} className='w-full overflow-hidden relative'>
             <div className="!overflow-hidden hidden lg:flex flex-col relative ">
                <Swiper
                    slidesPerView={5}
                    modules={[Navigation, Autoplay]}
                    className="mySwiper !overflow-hidden lg:!w-[890px] 2xl:!w-[1064px] !px-9 !z-50"
                    centeredSlides={false}
                    onSwiper={handleSwiper}
                    onSlideChange={handleSlideChange}
                    navigation={{
                        prevEl: prevRef.current,
                        nextEl: nextRef.current,
                    }}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                    spaceBetween={0}
                    loop={true}
                >
                    {items.map((item, index) => (
                        <SwiperSlide key={index} className="lg:!w-[210px]">
                            <Card 
                                item={item} 
                                isActive={isCardActive(item, index)}
                                onHover={handleHover}
                                onLeave={handleLeave}
                                onClick={handleClick}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>

                <div className='absolute hidden lg:top-0 z-10 lg:flex items-center w-full h-full justify-between'>
                    <button
                        ref={prevRef}
                        className={`p-2.5 border border-black !rounded-full w-[50px] h-[50px] bg-white enabled:opacity-100 disabled:opacity-40`}
                        >
                        <i className="bi bi-arrow-left text-2xl"></i>
                    </button>
                    <button
                        ref={nextRef}
                        className="p-2.5 border border-black !rounded-full w-[50px] h-[50px] bg-white enabled:opacity-100 disabled:opacity-40"
                        >
                        <i className="bi bi-arrow-right text-2xl"></i>
                    </button>
                </div>
             </div>

             <div className="!overflow-hidden flex lg:hidden flex-col relative">
                <Swiper
                    slidesPerView={3}
                    modules={[Autoplay]}
                    className="mySwiper !overflow-hidden !w-[358px]"
                    centeredSlides={false}
                    onSlideChange={handleSlideChange}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                    spaceBetween={0}
                    loop={true}
                >
                    {items.map((item, index) => (
                        <SwiperSlide key={index} className="2xl:!w-[100px] z-50">
                            <Card 
                                item={item} 
                                isActive={isCardActive(item, index)}
                                onHover={handleHover}
                                onLeave={handleLeave}
                                onClick={handleClick}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>

             </div>


             
            {displayedProduct?.Original.items_cont?.length > 0 && displayedProduct?.Original.items_cont[0].image && (
                <div>
                    <div className="mt-8 flex flex-wrap lg:!flex-nowrap lg:px-20 items-center gap-6">

                        <div className='w-full flex justify-center lg:block lg:min-w-[535px] lg:!w-[535px] !h-[400px]'>

                            {displayedProduct?.Original.items_cont[0]?.image[0]?.Url && (
                                <img 
                                    className='w-full h-full object-contain'
                                    src={displayedProduct.Original.items_cont[0].image[0].Url} 
                                    alt={displayedProduct.Original.items_cont[0]?.Title || ''} 
                                />
                            )}

                        </div>

                        <div className='flex flex-col gap-8 items-center lg:items-start'>
                            <div className='flex flex-col gap-6'>
                                <p className="carrusel_producto_descripcion_title">
                                    {displayedProduct?.Original.items_cont[0]?.Title || ''}
                                </p>
                                <p className="carrusel_producto_descripcion_detalls">
                                    {displayedProduct?.Original.items_cont[0]?.Content || ''}
                                </p>
                            </div>
                            <Link href={''} className='carrusel_producto_descripcion_button'>
                                Ábrela aquí
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default CarruselProductosView


// Exportar el componente para su uso
interface CardProps {
    item: CardItemModel;
    isActive?: boolean;
    onHover?: (item: CardItemModel) => void;
    onLeave?: () => void;
    onClick?: (item: CardItemModel) => void;
}

const Card = ({ 
    item, 
    isActive = false, 
    onHover, 
    onLeave, 
    onClick 
}: CardProps) => {
    const Orig = item.Original;
    const titulo = Orig.Title; 
    let imageUrl = item.Original.image[0].Url;

    return (
        <div 
            className={`
                h-[96px] flex px-4 py-2 flex-col items-center justify-center gap-1.5  cursor-pointer border-b-2 border-white hover:!border-[#CB801B] 2xl:h-[74px] lg:flex-row 2xl:px-6! 2xl:py-[15px]! 2xl:gap-4
                ${isActive ? '!border-[#CB801B]' : ''}
            `}
            onMouseEnter={() => onHover?.(item)}
            onMouseLeave={onLeave}
            onClick={() => onClick?.(item)}  
        >
            <div 
                className="w-9 h-9 min-w-9 flex items-center justify-center backenground_class_icon"
                style={{
                    background: `linear-gradient(0deg, #538F61, #538F61)`,
                    maskImage: imageUrl ? `url(${imageUrl})` : 'none',
                    WebkitMaskImage: imageUrl ? `url(${imageUrl})` : 'none',
                    maskSize: '100% 100%',
                    maskPosition: 'center',
                    maskRepeat: 'no-repeat',
                    backgroundSize: 'contain',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                }}                     
            >
                {/* Fallback si no hay imagen */}
            </div>
            
            <div className='!w-[100px]'>
                <p 
                    className={`text-[14px] 2xl:text-base text-center lg:!text-start text-[#474747] m-0 ${isActive ? 'font-bold' : 'font-normal'}`} 
                    style={{fontFamily: 'Duplet'}}
                >
                    {titulo || 'Sin título'}
                </p>
            </div>
        </div>
    );
};