'use client';
import React, { useEffect, useState } from 'react';
import { WidgetContext, htmlAttributes } from '@progress/sitefinity-nextjs-sdk';
import { MisCursosWidgetEntity } from './mis-cursos.entity';
import { ProgressBar } from 'react-bootstrap';
import { getPageNumber, ContentListsCommonRestService } from "@progress/sitefinity-nextjs-sdk/widgets";
import { Tracer } from "@progress/sitefinity-nextjs-sdk/diagnostics/empty";

export function MisCursosWidget(props: WidgetContext<MisCursosWidgetEntity>) {
    const dataAttributes = htmlAttributes(props);
    const {  ctx } = Tracer.traceWidget(props, true);
    const [listItems, setItems] = useState<any[]>([]);
    const model = props.model;
    const properties = model.Properties;
    const context = props.requestContext;

    const pageNumber = getPageNumber(properties.PagerMode, props.requestContext, properties.PagerQueryTemplate, properties.PagerTemplate);

    useEffect(() => {
        const fetchItems = async () => {
            try {

                const lists = await ContentListsCommonRestService.getItems(props.model.Properties, props.requestContext.detailItem, context, pageNumber, ctx, props.model.Properties.ShowListViewOnChildDetailsView);

                setItems(lists.Items);

            } catch (error) {
                console.error('Error fetching items:', error);
            }
        };
        fetchItems();
    }, []);

    return (
        <>
            <div {...dataAttributes}>
                <div className='row'>
                    {listItems?.map((item, i) => {
                        return (
                            <>
                                <div className='col-4 mb-5'>
                                    <div className="card mis-cursos">
                                        <img className="card-img-top" width={200} height={200} src={item?.Img[0].Url} alt="cursos" />
                                        {item.BadgeText == "" ? null : <span className="badge badge-danger badge-cursos" style={{ backgroundColor: item.BadgeColor }}>{item.BadgeText}</span>}
                                        <div className="card-body">
                                            <p className="card-title"><strong>{item.Title}</strong></p>
                                            <span className="card-text">{item.Content}</span>
                                        </div>
                                        <br />
                                        <div className="card card-footer">
                                            <p className='card-footer-title'><strong>{item.Progress >= 100 ? "¡Completado!" : "Avance"}</strong></p>
                                            <ProgressBar now={item.Progress} label={`${item.Progress > 100 ? "100" : item.Progress}%`} />
                                            <p className="card-footer-endDate">Vence: {item.EndDate.split('T')[0]}</p>
                                        </div>
                                    </div>
                                </div>
                            </>)
                    })}
                </div>
            </div>
        </>
    );
}