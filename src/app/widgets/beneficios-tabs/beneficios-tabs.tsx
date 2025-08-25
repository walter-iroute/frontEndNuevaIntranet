'use client';
import React, { useEffect, useState } from 'react';
import { BeneficiosCard } from './card-beneficios/BeneficiosWidget';
import { WidgetContext, htmlAttributes } from '@progress/sitefinity-nextjs-sdk';
import { ContentListsCommonRestService } from '@progress/sitefinity-nextjs-sdk/widgets';
import { Tracer } from '@progress/sitefinity-nextjs-sdk/diagnostics/empty';

import { BeneficiosTabsEntity } from './beneficios-tabs.entity';
import './beneficios-tabs.css';
interface Categoria {
    Id: string;
    Title: string;
}

interface BeneficiosImage {
    Url: string;
    Title: string;
}
interface Beneficios {
    Id: string;
    Title: string;
    descripcion: string;
    beneficioscategorias: string[];
    img: BeneficiosImage[];
    link: string; // Asumiendo que el link está en el campo Title de la imagen
}

export function BeneficiosWidget(props: WidgetContext<BeneficiosTabsEntity>) {
    const [beneficios, setbeneficios] = useState<Beneficios[]>([]);
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [tabIndex, setTabIndex] = useState(0);
    const dataAttributes = htmlAttributes(props);

    const { ctx } = Tracer.traceWidget(props, true);
    const context = props.requestContext;

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Obtener todas las categorías sin filtrar por TaxonomyId
                const catRes = await fetch('/api/default/flat-taxa');
                const catData = await catRes.json();
                setCategorias(catData.value || []);

                // Obtener beneficios usando ContentListsCommonRestService
                const lists = await ContentListsCommonRestService.getItems(
                    props.model.Properties,
                    props.requestContext.detailItem,
                    context,
                    0,
                    ctx,
                    false,
                );
                lists.Items.sort((a: any, b: any) => a.Order - b.Order);
                const mappedBeneficios: Beneficios[] = lists.Items.map((item: any) => ({
                    Id: item.Id,
                    Title: item.Title,
                    descripcion: item.descripcion || '',
                    beneficioscategorias: item.beneficioscategorias || [],
                    img: item.img || [],
                    link: item.link || '', // Asumiendo que el link está en el campo Title de la imagen
                }));
                setbeneficios(mappedBeneficios);
            } catch (err) {
                console.error('Error cargando datos:', err);
            }
        };

        fetchData();
    }, []);

    const handleTabClick = (index: number) => {
        setTabIndex(index);
    };

    // Filtrar categorías que tengan al menos un beneficio asociado
    const categoriasConBeneficios = categorias.filter(cat =>
        beneficios.some(ben => ben.beneficioscategorias?.includes(cat.Id))
    );

    return (
        <div {...dataAttributes} >
            {/* Mostrar tabs solo si hay categorías con beneficios */}
            {categoriasConBeneficios.length > 0 && (
                <ul style={{ gap: '3rem', borderBottom: '1px solid #94989A !important', width: 'fit-content' }} className='nav nav-underline mb-4 titulo-tabs'>
                    {categoriasConBeneficios.map((cat, index) => (
                        <li key={cat.Id} className='nav-item'>
                            <button
                                className={`nav-link ${tabIndex === index ? 'active' : ''}`}
                                onClick={() => handleTabClick(index)}
                                aria-current={tabIndex === index ? 'page' : undefined}
                            >
                                {cat.Title}
                            </button>
                        </li>
                    ))}
                </ul>
            )}

            <div>
                {categoriasConBeneficios.map((cat, index) => {
                    if (index !== tabIndex) return null;

                    const BeneficiosFiltradas = beneficios.filter((beneficios) => beneficios.beneficioscategorias?.includes(cat.Id));

                    return (
                        <div
                            style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fill, minmax(385px, 1fr))',
                                gap: '1rem',
                                overflowX: 'auto',
                                whiteSpace: 'normal',
                                scrollbarWidth: 'none',
                            }}
                            key={cat.Id}
                            className='row'
                        >
                            {BeneficiosFiltradas.length > 0 ? (
                                BeneficiosFiltradas.map((beneficios) => (
                                    <div key={beneficios.Id} className='col-md-4 mb-4'>
                                        <BeneficiosCard
                                            title={beneficios.Title}
                                            description={beneficios.descripcion}
                                            imageUrl={beneficios.img[0]?.Url}
                                            link={beneficios.link} // Asumiendo que el link está en el campo Title de la imagen
                                        />
                                    </div>
                                ))
                            ) : (
                                <div className='col'>
                                    <p className='text-muted'>No hay Beneficios para esta categoría.</p>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
