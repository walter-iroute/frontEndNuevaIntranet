'use client';
import './accordion.css';
import { htmlAttributes, WidgetContext } from '@progress/sitefinity-nextjs-sdk';
import { AccordionEntity } from './accordion.entity';
import React, { useEffect, useState } from 'react';
import { RiArrowDropDownLine } from 'react-icons/ri';
import { ContentListsCommonRestService } from '@progress/sitefinity-nextjs-sdk/widgets';
import { Tracer } from '@progress/sitefinity-nextjs-sdk/diagnostics/empty';
import {sanitizerHTML} from "../../utils/Sanitizer";

export function Accordion(props: WidgetContext<AccordionEntity>) {
    const dataAttributes = htmlAttributes(props);
    const context = props.requestContext;
    const {  ctx } = Tracer.traceWidget(props, true);
    const [openIndex, setOpenIndex] = useState(null);
    const [listItems, setItems] = useState<any[]>([]);

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

                const itemNavs = await Promise.all(lists.Items);

                setItems(itemNavs);
            } catch (error) {
                console.error('Error fetching items:', error);
            }
        };
        fetchItems();
    }, []);

    const toggleAccordion = (index: any) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div {...dataAttributes}>
            {listItems?.map((item, index) => {
                return (
                    <div className='wrapper' key={item.Id}>
                        <button className='question-container' onClick={() => toggleAccordion(index)}>
                            <p className='question-content m-0'>{item.Title}</p>
                            <RiArrowDropDownLine />
                        </button>
                        {openIndex === index && (
                            <div className='answer-container'>
                                <div className="answer-content m-0">{sanitizerHTML(item.Content)} </div>
                                
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}
