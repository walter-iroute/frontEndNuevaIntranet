'use client';
import '../sidebar/sidebar.css';
import { useEffect, useState } from 'react';
import { Tracer } from '@progress/sitefinity-nextjs-sdk/diagnostics/empty';
import { WidgetContext, htmlAttributes } from '@progress/sitefinity-nextjs-sdk';
import { SidebarEntity } from '../sidebar/sidebar.entity';
import { ContentListsCommonRestService } from '@progress/sitefinity-nextjs-sdk/widgets';

export function Sidebar(props: WidgetContext<SidebarEntity>) {
    const [items, setItems] = useState<any[]>([]);
    const dataAttributes = htmlAttributes(props);
    const {ctx} = Tracer.traceWidget(props, true);
    const context = props.requestContext;

    const getLink = (item: string) => {
        const parseJson = JSON.parse(item);
        return parseJson[0].href;
    };

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

                setItems(lists.Items);
            } catch (error) {
                console.error('Error fetching items:', error);
            }
        };

        fetchItems();
    }, []);

    return (
        <div className='layout' {...dataAttributes}>
            <aside className='sidebar'>
                {items?.map((item, index) => {
                    const hasImage = Array.isArray(item.Img) && item.Img.length > 0;
                    const imageUrl = hasImage ? item.Img[0].Url : '/assets/placeholder.png';
                    const imageAlt = hasImage ? item.Img[0].AlternativeText || 'Image' : 'Image';
                    const imageTitle = hasImage ? item.Img[0].Title || 'Image' : 'Image';
                    const currentPath = window.location.pathname;

                    return (
                        <div
                            key={item.Id || `sidebar-item-${index}`}
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                flexDirection: 'column',
                            }}
                        >
                            <a
                                href={getLink(item.Link)}
                                className={`icon-container ${currentPath === getLink(item.Link) ? 'active' : ''}`}
                                style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                                title={item.Title}
                            >
                                <img
                                    className={` img-icon ${currentPath === getLink(item.Link) ? 'active' : ''}`}
                                    id={`logo${index}`}
                                    src={imageUrl}
                                    alt={imageAlt}
                                    title={imageTitle}
                                />
                            </a>
                            <p className='text-sidebar'>{item.Title}</p>
                        </div>
                    );
                })}
            </aside>
        </div>
    );
}