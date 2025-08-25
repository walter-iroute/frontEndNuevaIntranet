'use client';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import './gobernanza.css';
import '../carrusel/carrusel.css';
import { useEffect, useState } from 'react';
import { WidgetContext, htmlAttributes } from '@progress/sitefinity-nextjs-sdk';
import { Tracer } from '@progress/sitefinity-nextjs-sdk/diagnostics/empty';
import { GobernanzaWidgetEntity } from './gobernanza.entity';
import { ContentListsCommonRestService } from '@progress/sitefinity-nextjs-sdk/widgets';

interface DirectivosImage {
    Url: string;
    Title: string;
}
interface Directivos {
    Id: string;
    fullName?: string; // Cambiado de Title a fullName para mayor claridad
    Title: string;
    grado: string;
    cargo: string;
    img: DirectivosImage[];
}

export function GobernanzaWidget(props: WidgetContext<GobernanzaWidgetEntity>) {
    //const [directivos, setItems] = useState<UserLdap[]>([]);
    const [directivos, setDirectivos] = useState<Directivos[]>([]);
    const { ctx } = Tracer.traceWidget(props, true);
    const context = props.requestContext;

    // Estado para el slider
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
    //const dataAttributes = htmlAttributes(props);

    // Configuración del slider
    const itemsPerSlide = 9; // Mostrar 9 elementos por slide (3 columnas x 3 filas)
    const shouldShowSlider = directivos.length > 9;
    // Calcular el número total de slides
    const totalSlides = Math.ceil(directivos.length / itemsPerSlide);

    // Funciones para navegar el slider
    const goToSlide = (index: number) => {
        setCurrentSlideIndex(index);
    };

    // Obtener los elementos del slide actual
    const getCurrentSlideItems = () => {
        if (!shouldShowSlider) {
            return directivos;
        }

        const startIndex = currentSlideIndex * itemsPerSlide;
        const endIndex = startIndex + itemsPerSlide;
        return directivos.slice(startIndex, endIndex);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const lists = await ContentListsCommonRestService.getItems(
                    props.model.Properties,
                    props.requestContext.detailItem,
                    context,
                    0,
                    ctx,
                    false,
                );
                lists.Items.sort((a: any, b: any) => a.Order - b.Order);
                const mappedDirectivos: Directivos[] = lists.Items.map((item: any) => ({
                    Id: item.Id,
                    Title: item.Title,
                    grado: item.grado || '',
                    cargo: item.cargo || '',
                    img: item.img || [],
                    fullName: item.fullName || item.Title, // Asignar fullName si está disponible, sino usar Title
                }));

                setDirectivos(mappedDirectivos);
            } catch (err) {
                console.error('Error cargando datos:', err);
            }
        };

        fetchData();
    }, []);

    const dataAttributes = htmlAttributes(props);
    let validateHeiht = 'fit-content';
    if (shouldShowSlider) {
        validateHeiht = 'fit-content';
    }else if(directivos.length < 4){
        validateHeiht="850px"
    } 
    
    else if (directivos.length === 6) {
        validateHeiht = '850px';
    }
    
    else if (directivos.length > 6){
        validateHeiht="1424px";
    
    } else {
        validateHeiht = 'fit-content';
    }

    const currentItems = getCurrentSlideItems();

    return (
        <div
            {...dataAttributes}
            className='container_padre'
            style={{
                position: 'relative',
                overflow: 'hidden', // Evita que el contenido se salga
                boxSizing: 'border-box',
                height: validateHeiht,
            }}
        >
            {/* Contenedor para los controles y el grid */}
          

            {/* Grid con altura dinámica solo cuando hay más elementos */}
            <section
                className='container_Cards'
                {...dataAttributes}
                style={
                    shouldShowSlider
                        ? {
                              height: 'auto',
                              minHeight: '381.83px',
                              maxHeight: 'calc(3 * 381.83px + 2 * 73.06px)',
                              gridTemplateRows: 'repeat(auto-fit, 381.83px)',
                          }
                        : {}
                }
            >
                {currentItems.length === 0 ? (
                    <div className='d-flex justify-content-center align-items-center' style={{ minHeight: '200px' }}>
                        <p>No hay información de gobernanza para mostrar.</p>
                    </div>
                ) : (
                    currentItems.map((item, index) => {
                        const imageUrl = item.img[0]?.Url || '/assets/checker.png';
                        const imageAlt = item.fullName || 'Usuario';
                        const imageTitle = item.fullName || 'Usuario';
                        const fullnameGrado = item.grado ? `${item.grado}. ` : '';

                        return (
                            <section className='cards' key={`${currentSlideIndex}-${index}`}>
                                <figure className='cards-figure'>
                                    <img src={imageUrl} alt={imageAlt} title={imageTitle} className='cards-imagen' />
                                </figure>
                                <section className='cards-content text-start mt-3'>
                                    <h3 className='title cursor-pointer' title={fullnameGrado + item.fullName}>
                                        {item.grado ? `${item.grado}. ` : ''}
                                        {item.fullName}
                                    </h3>
                                    <div className='cards_linea'></div>
                                    <p className='parrafo'>{item.cargo}</p>
                                </section>
                            </section>
                        );
                    })
                )}
            </section>

            {/* Paginación con círculos (solo si hay slider) */}
            {shouldShowSlider && (
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '3px' }}>
                    <div style={{ display: 'flex', gap: '8px' }}>
                        {Array.from({ length: totalSlides }, (_, index) => (
                            <button
                                key={index}
                                onClick={() => goToSlide(index)}
                                style={{
                                    width: '12px',
                                    height: '12px',
                                    borderRadius: '50%',
                                    border: 'none',
                                    backgroundColor: index === currentSlideIndex ? '#538F61' : '#d1d5db',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease',
                                    opacity: index === currentSlideIndex ? 1 : 0.5,
                                }}
                                onMouseEnter={(e) => {
                                    if (index !== currentSlideIndex) {
                                        (e.target as HTMLButtonElement).style.backgroundColor = '#9ca3af';
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (index !== currentSlideIndex) {
                                        (e.target as HTMLButtonElement).style.backgroundColor = '#d1d5db';
                                    }
                                }}
                                aria-label={`Ir al slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            )}

            {/* Contador de slides (solo si hay slider) */}
            {shouldShowSlider && (
                <div style={{ textAlign: 'center', marginTop: '10px' }}>
                    <span style={{ fontSize: '14px', color: '#6b7280' }}>
                        {currentSlideIndex + 1} de {totalSlides}
                    </span>
                </div>
            )}
     
        </div>
    );
}
