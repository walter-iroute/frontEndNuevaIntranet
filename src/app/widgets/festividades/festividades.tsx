'use client';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import '../carrusel/carrusel.css';
import './festividades.css';
import { useEffect, useState, useRef, useCallback } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, FreeMode, EffectFade, Autoplay, Navigation } from 'swiper/modules';
import { WidgetContext, htmlAttributes } from '@progress/sitefinity-nextjs-sdk';
import { Tracer } from '@progress/sitefinity-nextjs-sdk/diagnostics/empty';
import { FestividadesWidgetEntity } from './festividades.entity';
import { useGetAllUsers, UserLdap } from '../../hooks/useAllUsers'; // Ajusta la ruta según tu estructura
import React from 'react';
import moment from 'moment';
import 'moment/locale/es';
import { ContentListsCommonRestService } from '@progress/sitefinity-nextjs-sdk/widgets';

interface Feriados {
    Id: string;
    Title: string;
    EndDate: string; // Asegúrate de que este campo sea el correcto según tu estructura de datos
    StartDate: string; // Asegúrate de que este campo sea el correcto según tu estructura de datos
}

export function FestividadesWidget(props: WidgetContext<FestividadesWidgetEntity>) {
    // Estado para almacenar las fotos de los usuarios visibles
    const [userPhotos, setUserPhotos] = useState<Record<string, { PhotoBase64: string; HasPhoto: boolean }>>({});
    const [listItems, setItems] = useState<UserLdap[]>([]);
    const [listItemsFeriado, setItemsFeriado] = useState<any[]>([]);

    const [activeTab, setActiveTab] = useState<'cumpleaños' | 'aniversarios'>('cumpleaños');
    const [isBirthday, setIsBirthday] = useState<boolean>(true);
    const [isAniversary, setIsAniversary] = useState<boolean>(false);
    const [swiperInstance, setSwiperInstance] = useState<any>(null);
    const [feriados, setFeriados] = useState<Feriados[]>([]); // Asegúrate de definir la interfaz Feriados

    // Usar el hook personalizado en lugar del entity
    const { users, loading, error } = useGetAllUsers();


    const dataAttributes = htmlAttributes(props);
    const infinte = props.model?.Properties?.Infinite;
    const navegacion = props.model?.Properties?.Navegacion;
    const { span, ctx } = Tracer.traceWidget(props, true);
    const context = props.requestContext;
    moment.locale('es');

    const prevRef = useRef<HTMLButtonElement>(null);
    const nextRef = useRef<HTMLButtonElement>(null);

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
                lists.Items.sort((a: any, b: any) => a.Order - b.Order);
                setItemsFeriado(lists.Items);
                const mappedFeriados: Feriados[] = lists.Items.map((item: any) => ({
                    Id: item.Id,
                    Title: item.Title,
                    EndDate: item.EndDate,
                    StartDate: item.StartDate,
                }));

                setFeriados(mappedFeriados);
            } catch (error) {
                console.error('Error fetching items:', error);
            }
        };

        fetchItems();
    }, [users]);
    const clickTab = (selectedTab: 'cumpleaños' | 'aniversarios') => {
        setActiveTab(selectedTab);
        if (selectedTab === 'cumpleaños') {
            setIsBirthday(true);
            setIsAniversary(false);
        } else {
            setIsBirthday(false);
            setIsAniversary(true);
        }
    };

    // Función centralizada para parsear fechas desde string
    const parseDate = (dateString: string | undefined) => {
        if (!dateString) return null;
        return moment(dateString, 'DD/MM/YYYY', true); // estricta validación
    };
    // Función centralizada para verificar si una fecha es hoy (solo día y mes)
    const isToday = (dateString: string | undefined): boolean => {
        if (!dateString) return false;

        const parsed = moment(dateString, 'DD/MM/YYYY', true);
        if (!parsed.isValid()) return false;

        const today = moment();

        return parsed.date() === today.date() && parsed.month() === today.month();
    };

    const isVisible = (dateString: string | undefined): boolean => {
        if (!dateString) return false;
        const today = moment();
        const inputDate = parseDate(dateString);
        if (!inputDate || !inputDate.isValid()) return false;
        const inputDayMonth = inputDate.format('DDMM');
        // Día actual
        const todayDayMonth = today.format('DDMM');
        if (inputDayMonth === todayDayMonth) return true;
        // Para fechas futuras (mismo día/mes), validar que no sean anteriores a hoy
        const inputDateThisYear = inputDate.clone().year(today.year());
        if (inputDateThisYear.isBefore(today, 'day')) {
            return false;
        }
        // Verificar si la fecha está dentro de algún rango de feriado
        const isFeriado = feriados.some((f) => {
            const startDate = moment(f.StartDate).startOf('day');
            const endDate = moment(f.EndDate).startOf('day');
            if (!startDate.isValid() || !endDate.isValid()) return false;
            // Crear fechas con el año actual para comparar solo día y mes
            const currentYear = today.year();
            const feriadoStart = startDate.clone().year(currentYear);
            const feriadoEnd = endDate.clone().year(currentYear);
            const inputDateWithCurrentYear = inputDate.clone().year(currentYear);
            // Verificar si la fecha de entrada está dentro del rango del feriado
            return inputDateWithCurrentYear.isBetween(feriadoStart, feriadoEnd, 'day', '[]'); // '[]' incluye los extremos
        });
        if (isFeriado) return true;
        // Verificar si hay algún feriado que termine en viernes para mostrar el fin de semana siguiente
        const shouldShowWeekend = feriados.some((f) => {
            const endDate = moment(f.EndDate);
            if (!endDate.isValid()) return false;
            const currentYear = today.year();
            const feriadoEnd = endDate.clone().year(currentYear);
            // Si el feriado termina en viernes (día 5)
            if (feriadoEnd.day() === 5) {
                const saturday = feriadoEnd.clone().add(1, 'day').format('DDMM');
                const sunday = feriadoEnd.clone().add(2, 'day').format('DDMM');
                // Mostrar sábado y domingo después del viernes de fin de feriado
                return inputDayMonth === saturday || inputDayMonth === sunday;
            }
            return false;
        });
        if (shouldShowWeekend) return true;
        // Si hoy es viernes, mostrar si la fecha es sábado o domingo
        if (today.day() === 5) {
            // 5 = viernes
            const saturday = today.clone().add(1, 'day').format('DDMM');
            const sunday = today.clone().add(2, 'day').format('DDMM');
            if (inputDayMonth === saturday || inputDayMonth === sunday) {
                return true;
            }
        }
        return false;
    };
    const doFilterItems = (items: UserLdap[], selectedTab: 'cumpleaños' | 'aniversarios') => {
        if (selectedTab === 'cumpleaños') {
            return items.filter((item: UserLdap) => isVisible(item.birthDay));
        } else {
            return items.filter((item: UserLdap) => isVisible(item.hireDay));
        }
    };

    const happyDay = (date: string | undefined): string => {
        if (!date) return '';

        const original = parseDate(date);
        if (!original || !original.isValid()) return '';

        // Reemplazar el año por el actual para obtener el día correcto
        const dateWithCurrentYear = moment({
            year: moment().year(),
            month: original.month(), // month es 0-indexed en moment
            date: original.date(),
        });

        return isToday(date)
            ? dateWithCurrentYear.format('[Hoy -] D [de] MMMM')
            : dateWithCurrentYear.format('D [de] MMMM');
    };


    const getIconName = (tab: 'cumpleaños' | 'aniversarios') => {
        return tab === 'cumpleaños' ? 'cumpleaños_v2' : 'aniversarios_v2';
    };

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

    // Efecto para filtrar items cuando cambia la pestaña activa o se cargan los usuarios
    useEffect(() => {
        if (!loading && users.length > 0) {
            const filtered = doFilterItems(users, activeTab);
            setItems(filtered);
        } else {
            setItems([]);
        }
    }, [activeTab, users, loading]);

    // Efecto para obtener las fotos de los usuarios visibles
    useEffect(() => {
        const fetchPhotos = async () => {
            const photos: Record<string, { PhotoBase64: string; HasPhoto: boolean }> = {};
            await Promise.all(
                listItems.map(async (item) => {
                    if (!item.email) return;
                    try {
                        const resp = await fetch(`/api/get-photo?email=${encodeURIComponent(item.email)}`);
                        if (!resp.ok) return;
                        const data = await resp.json();
                        photos[item.email] = {
                            PhotoBase64: data.PhotoBase64,
                            HasPhoto: data.HasPhoto,
                        };
                    } catch {
                        // Si falla, no se guarda nada
                    }
                })
            );
            setUserPhotos(photos);
        };
        if (listItems.length > 0) {
            fetchPhotos();
        } else {
            setUserPhotos({});
        }
    }, [listItems]);

    const shouldCenterSlides = listItems.length <= 3;
    const currentIcon = getIconName(activeTab);

    const handleSwiperInit = useCallback((swiper: any) => {
        setSwiperInstance(swiper);

        // Asegurar que los botones estén disponibles
        if (prevRef.current && nextRef.current) {
            prevRef.current.onclick = () => swiper.slidePrev();
            nextRef.current.onclick = () => swiper.slideNext();
        }
    }, []);

    // Función para obtener los items ordenados por fecha (día y mes)
    const getSortedItems = () => {
        return [...listItems].sort((a, b) => {
            const dateA = parseDate(activeTab === 'cumpleaños' ? a.birthDay : a.hireDay);
            const dateB = parseDate(activeTab === 'cumpleaños' ? b.birthDay : b.hireDay);
            if (!dateA && !dateB) return 0;
            if (!dateA) return 1;
            if (!dateB) return -1;
            // Ordenar por mes y día, ignorando el año
            if (dateA.month() !== dateB.month()) {
                return dateA.month() - dateB.month();
            }
            return dateA.date() - dateB.date();
        });
    };

    // Renderizar los items como tarjetas
    const renderCard = (item: UserLdap, index: number) => {
        let imageUrl = '/assets/checker.png';
        if (item.email && userPhotos[item.email] && userPhotos[item.email].HasPhoto && userPhotos[item.email].PhotoBase64) {
            imageUrl = `data:image/jpeg;base64,${userPhotos[item.email].PhotoBase64}`;
        }
        const imageAlt = item.fullName || 'Usuario';
        const imageTitle = item.fullName || 'Usuario';

        return (
            <div key={index} className='container-card-colab'>
                <figure className='card_festividades_cumpleanios_contenedor_imagenes'>
                    <img className='img-festividades' src={imageUrl} alt={imageAlt} title={imageTitle} />
                </figure>

                <div className={'card_festividades_cumpleanios_contenedor '}>
                    <p
                        className={'card_festividades_cumpleanios_title card_festividades_cumpleanios_font'}
                        title={item.fullName}
                    >
                        {item.fullName}
                    </p>
                    <div className='card_festividades_cumpleanios'>
                        <img src={`/assets/${currentIcon}.png`} alt='' className='card_festividades_cumpleanios_icon' />
                        <span className='card_festividades_cumpleanios_span card_festividades_cumpleanios_font'>
                            {activeTab === 'cumpleaños' ? happyDay(item.birthDay) : happyDay(item.hireDay)}
                        </span>
                    </div>
                    <div className='linea_festividades_cumpleanios'></div>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        height: '60px'
                    }}>
                        <p style={{
                            display: '-webkit-box',
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            lineHeight: 1.2,  // Cambiado de '1' a 1 (número es más estándar)
                            flex: 1,        // Cambiado de '1' a 1 
                            margin: 0       // Agregado para eliminar márgenes por defecto del <p>
                        }}
                            title={item.cargo}
                            className={'card_festividades_cumpleanios_areas_branch card_festividades_cumpleanios_font'}>
                            {item.cargo}
                        </p>
                    </div>
                    <div className='linea_festividades_cumpleanios'></div>
                    <p className={'card_festividades_cumpleanios_areas_branch card_festividades_cumpleanios_font'}>
                        {item.zona}
                    </p>
                </div>
            </div>
        );
    };

    // Mostrar loading state
    if (loading) {
        return (
            <div {...dataAttributes}>
                <div className='d-flex justify-content-center align-items-center' style={{ minHeight: '200px' }}>
                    <p>Cargando festividades...</p>
                </div>
            </div>
        );
    }

    // Mostrar error state
    if (error) {
        return (
            <div {...dataAttributes}>
                <div className='d-flex justify-content-center align-items-center' style={{ minHeight: '200px' }}>
                    <p className='text-danger'>Error: {error}</p>
                </div>
            </div>
        );
    }

    // Extract the nested ternary into a variable for clarity and maintainability
    let contentToRender: React.ReactNode;
    if (listItems.length === 0) {
        contentToRender = (
            <div className='d-flex justify-content-center align-items-center' style={{ minHeight: '200px' }}>
                <p>No hay {activeTab} para mostrar hoy.</p>
            </div>
        );
    } else if (getSortedItems().length > 3) {
        contentToRender = (
            <div style={{ position: 'relative', padding: '0 60px' }}>
                <Swiper
                    key={`${activeTab}-${listItems.length}`}
                    spaceBetween={20}
                    slidesPerView={3}
                    centeredSlides={shouldCenterSlides}
                    // autoplay={{
                    //     delay: 2000,
                    //     disableOnInteraction: false,
                    // }}
                    freeMode={true}
                    pagination={{ clickable: true }}
                    loop={infinte}
                    modules={[EffectFade, Autoplay, Pagination, Navigation, FreeMode]}
                    className='classic-swiper swiper-festividades'
                    navigation={false}
                    onSwiper={handleSwiperInit}
                >
                    {getSortedItems().map((item) => (
                        <SwiperSlide key={item.email || item.fullName || item.hireDay || item.birthDay}>
                            <button
                                type="button"
                                className="text-decoration-none festividades-slide-btn"
                                style={{ background: 'none', border: 'none', padding: 0, width: '100%' }}
                                tabIndex={-1}
                                aria-label={item.fullName || 'Usuario'}
                            >
                                {renderCard(item, 0)}
                            </button>
                        </SwiperSlide>
                    ))}
                </Swiper>
                {navegacion && (
                    <>
                        <button
                            ref={prevRef}
                            className='arrow3 arrow3--prev2'
                            aria-label='Elemento anterior'
                            onClick={handlePrevClick}
                            type='button'
                        />
                        <button
                            ref={nextRef}
                            className='arrow3 arrow3--next2'
                            aria-label='Elemento siguiente'
                            onClick={handleNextClick}
                            type='button'
                        />
                    </>
                )}
            </div>
        );
    } else {
        contentToRender = (
            <div className='swiper-festividades'>
                {getSortedItems().map((item) => (
                    <React.Fragment key={item.email || item.fullName || item.hireDay || item.birthDay}>
                        {renderCard(item, 0)}
                    </React.Fragment>
                ))}
            </div>
        );
    }

    return (
        <div {...dataAttributes}>
            <div className='d-flex justify-content-center'>
                <div
                    className='d-flex justify-content-center'
                    style={{ gap: '72px', marginBottom: '38px', borderBottom: '1px solid #94989A', width: 'auto' }}
                >
                    <div
                        className={`${isBirthday ? 'tab-active d-flex align-items-center mr-10' : 'tab-inactive d-flex align-items-center mr-10'}`}
                        style={{ gap: '12px', height: '77px', position: 'relative' }}
                    >
                        <img style={{ height: '42px', width: '42px' }} src='/assets/cumpleaños.png' alt='' />
                        <span className='tab_text'>Cumpleaños</span>
                        <button
                            type="button"
                            aria-pressed={isBirthday}
                            aria-label="Cumpleaños"
                            tabIndex={0}
                            onClick={() => clickTab('cumpleaños')}
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                opacity: 0,
                                cursor: 'pointer',
                                border: 'none',
                                background: 'transparent',
                                padding: 0,
                                margin: 0,
                            }}
                        />
                    </div>
                    <div
                        className={
                            isAniversary
                                ? 'tab-active d-flex align-items-center'
                                : 'tab-inactive d-flex align-items-center'
                        }
                        style={{ gap: '12px', height: '77px', position: 'relative' }}
                    >
                        <img style={{ height: '42px', width: '42px' }} src='/assets/aniversarios.png' alt='' />
                        <span className='tab_text'>Aniversarios</span>
                        <button
                            type="button"
                            aria-pressed={isAniversary}
                            aria-label="Aniversarios"
                            tabIndex={0}
                            onClick={() => clickTab('aniversarios')}
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                opacity: 0,
                                cursor: 'pointer',
                                border: 'none',
                                background: 'transparent',
                                padding: 0,
                                margin: 0,
                            }}
                        />
                    </div>
                </div>
            </div>
            {contentToRender}
        </div>
    );
}
