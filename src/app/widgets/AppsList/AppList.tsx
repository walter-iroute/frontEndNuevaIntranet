'use client';
import React, { useEffect, useState } from 'react';
import { AppsCardlist } from './AppsCardList/AppsCardList';
import { WidgetContext, htmlAttributes } from '@progress/sitefinity-nextjs-sdk';
import { AppListEntity } from './AppList.entity';
import './AppsList.css';
import { ContentListsCommonRestService } from '@progress/sitefinity-nextjs-sdk/widgets';
import { Tracer } from '@progress/sitefinity-nextjs-sdk/diagnostics/empty';
import { useCurrentUser } from '../../hooks/useCurrentUser';

interface AppImage {
    Url: string;
    Title: string;
}

interface App {
    Id: string;
    Title: string;
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

export function AppsListWidget(props: WidgetContext<AppListEntity>) {
    const { user } = useCurrentUser();

    const [apps, setApps] = useState<App[]>([]);

    const [listItems, setItems] = useState<any[]>([]);

    const dataAttributes = htmlAttributes(props);
    const { ctx } = Tracer.traceWidget(props, true);
    const context = props.requestContext;

    useEffect(() => {
        if (!user) return;

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
                
                setItems(lists.Items);
                const mappedApps: App[] = lists.Items.map((item: any) => ({
                    Id: item.Id,
                    Title: item.Title,
                    img: item.img || [],
                    modulos: item.modulos || [],
                    LinkApp: item.linkApp,
                    Perfiles: item.Perfiles.map((rol: any) => rol.Title),
                }));
               
                
                const appsFilteredByRole = filterAppsByRole(mappedApps, user.profile);

                setApps(appsFilteredByRole);
               
            } catch (error) {
                console.error('Error fetching items:', error);
            }
        };

        fetchItems();
    }, [user]);

      function filterAppsByRole(apps: App[], userRole: string): App[] {
    return apps.filter(app => app.Perfiles?.includes(userRole))
}

    return (
        <div
            style={{ display: 'flex', gap: '2.25rem', flexDirection: 'column' }}
            className='appListContainer'
            {...dataAttributes}
        >
            <div style={{ display: 'flex', gap: '1rem', flexDirection: 'column' }}>
                <p className='titulo-widget'>Accede a tus Aplicaciones Seguras</p>
                <p className='text-cards'>
                    Accede a las herramientas digitales diseñadas para facilitar tus tareas, impulsar la productividad y
                    fomentar la colaboración en tu equipo.
                </p>
            </div>
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)', // Dos columnas
                    gridTemplateRows: 'repeat(3, 1fr)', // Tres filas
                    whiteSpace: 'normal',
                    gap: '36px',
                    placeItems: 'center',
                }}
            >
                {apps.length > 0 ? (
                    apps.slice(0, 5).map((app) => (
                        <div key={app.Id}>
                            <AppsCardlist
                                linkApp={app.LinkApp}
                                modulos={app.modulos}
                                title={app.Title}
                                imageUrl={app.img[0]?.Url}
                            />
                        </div>
                    ))
                ) : (
                    <div className='col'>
                        <p className='text-muted'>No hay aplicaciones disponibles.</p>
                    </div>
                )}

                {/* Agregar el ícono de "Ver más apps" en el sexto lugar */}
                <div
                    style={{
                        display: 'flex',
                        height: '100%',
                        width: '100%',
                        backgroundColor: 'white',
                        borderRadius: '8px',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <a href={props.model.Properties.PageLink || ''} className='document-item'>
                        <img src='/assets/dash.svg' alt='' />
                        <p className='text-cards1'>Ver mas</p>
                    </a>
                </div>
            </div>
        </div>
    );
}
