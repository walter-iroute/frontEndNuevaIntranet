'use client';
import React, { useEffect, useState } from 'react';
import { AppCard } from './card-app/AppWidget';
import { WidgetContext, htmlAttributes } from '@progress/sitefinity-nextjs-sdk';
import { ContentListsCommonRestService } from '@progress/sitefinity-nextjs-sdk/widgets';
import { Tracer } from '@progress/sitefinity-nextjs-sdk/diagnostics/empty';
import { AppsTabsEntity } from './app-tabs.entity';
import './app-tabs.css';

import { useCurrentUser } from '../../hooks/useCurrentUser';

interface Categoria {
    Id: string;
    Title: string;
}

interface AppImage {
    Url: string;
    Title: string;
}
interface App {
    Id: string;
    Title: string;
    descripcion: string;
    appscategorias: string[];
    img: AppImage[];
    modulos: {
        Id: string;
        Title: string;
        link: string;
        // ...otros campos si es necesario...
    }[];
    LinkApp: string;
    Perfiles: string[];
    
}


export function AplicacionesWidget(props: WidgetContext<AppsTabsEntity>) {

    const { user } = useCurrentUser(); 
    const [apps, setApps] = useState<App[]>([]);
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [tabIndex, setTabIndex] = useState(0);
    const dataAttributes = htmlAttributes(props);

    const { ctx } = Tracer.traceWidget(props, true);
    const context = props.requestContext;

    useEffect(() => {
        
         if (!user) return;

        const fetchData = async () => {
            try {
                // Obtener categorías como antes
                const catRes = await fetch('/api/default/flat-taxa');
                const catData = await catRes.json();
                setCategorias(catData.value || []);

                // Obtener aplicaciones usando ContentListsCommonRestService
                const lists = await ContentListsCommonRestService.getItems(
                    props.model.Properties,
                    props.requestContext.detailItem,
                    context,
                    0,
                    ctx,
                    false,
                );
                lists.Items.sort((a: any, b: any) => a.Order - b.Order);
                const mappedApps: App[] = lists.Items.map((item: any) => ({
                    Id: item.Id,
                    Title: item.Title,
                    descripcion: item.descripcion || '',
                    appscategorias: item.appscategorias || [],
                    img: item.img || [],
                    modulos: item.modulos || [],
                    LinkApp: item.linkApp,
                    Perfiles: item.Perfiles.map((rol:any) => rol.Title)   
                }));

                const appsFilteredByRole = filterAppsByRole(mappedApps, user.profile)

                setApps(appsFilteredByRole);

                // setApps(mappedApps);
            } catch (err) {
                console.error('Error cargando datos:', err);
            }
        };

        fetchData();
    }, [user]);

    const handleTabClick = (index: number) => {
        setTabIndex(index);
    };


    function filterAppsByRole(apps: App[], userRole: string): App[] {
    return apps.filter(app => app.Perfiles?.includes(userRole))
}

    // Filtrar categorías que tengan al menos una app asociada
    const categoriasConApps = categorias.filter((cat) => apps.some((app) => app.appscategorias?.includes(cat.Id)));

    return (
        <div {...dataAttributes}>
            {/* Mostrar tabs solo si hay categorías con apps */}
            {categoriasConApps.length > 0 && (
                <ul
                    style={{ gap: '3rem', borderBottom: '1px solid #94989A !important', width: 'fit-content' }}
                    className='nav nav-underline mb-4 titulo-tabs'
                >
                    {categoriasConApps.map((cat, index) => (
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
                {categoriasConApps.map((cat, index) => {
                    if (index !== tabIndex) return null;

                    const appsFiltradas = apps.filter((app) => app.appscategorias?.includes(cat.Id));

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
                            {appsFiltradas.length > 0 ? (
                                appsFiltradas.map((app) => (
                                    <div key={app.Id} className='col-md-4 mb-4'>
                                        <AppCard
                                            title={app.Title}
                                            description={app.descripcion}
                                            imageUrl={app.img[0]?.Url}
                                            linkApp={app.LinkApp}
                                            modulos={app.modulos}
                                        />
                                    </div>
                                ))
                            ) : (
                                <div className='col'>
                                    <p className='text-muted'>No hay aplicaciones para esta categoría.</p>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
