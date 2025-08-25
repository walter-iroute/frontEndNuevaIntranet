'use client';
import { useEffect, useState } from 'react';
import { WidgetContext, htmlAttributes } from '@progress/sitefinity-nextjs-sdk';
import { CardListEntity } from './cardList.entity';
import React from 'react';
import { ContentListsCommonRestService } from '@progress/sitefinity-nextjs-sdk/widgets';
import { Tracer } from '@progress/sitefinity-nextjs-sdk/diagnostics/empty';
import { CardNoticiasView } from './views/card-noticias/card-noticias-view';

export function CardList(props: WidgetContext<CardListEntity>) {
    const [listItems, setItems] = useState<any[]>([]);
    const { span, ctx } = Tracer.traceWidget(props, true);
    const dataAttributes = htmlAttributes(props);
    const viewName = props.model?.Properties?.SfViewName || 'CardNoticias';
    const context = props.requestContext;

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

                if (viewName == 'CardNoticias') {
                    if (lists.Items.length >= 2) {
                        lists.Items.sort(
                            (a: any, b: any) => new Date(b.DateInit).getTime() - new Date(a.DateInit).getTime(),
                        );
                        lists.Items = lists.Items.slice(0, 2);
                    }
                }
                
                setItems(lists.Items);
            } catch (error) {
                console.error('Error fetching items:', error);
            }
        };
        
        fetchItems();
    }, []);
    
 
    return (
        <div {...dataAttributes}>
            <div style={{ display: 'flex', gap: '1rem', flexDirection: 'column', marginBottom: '2rem' }}>
                <p className='titulo-widget'>Últimas noticias</p>
                <p className='text-cards'>
                    Entérate de las últimas novedades de tu Banco
                </p>
            </div>
            {listItems?.map((item, index) => {
                const hasImage = Array.isArray(item.Img) && item.Img.length > 0;
                const imageUrl = hasImage ? item.Img[0].Url : '/assets/placeholder.png';
                const imageAlt = hasImage ? item.Img[0].AlternativeText || 'Image' : 'Image';
                const imageTitle = hasImage ? item.Img[0].Title || 'Image' : 'Image';

                const dto = {
                    
                    Item: item,
                    Img: imageUrl,
                    AlternativeText: imageAlt,
                    TitleImage: imageTitle,
                };

                return <div key={item.Id} {...dataAttributes}>{viewName == 'CardNoticias' && <CardNoticiasView {...dto} />}</div>;
            })}
        </div>
    );
}
