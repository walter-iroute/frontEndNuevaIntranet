'use client';

import './tab-list.css';

import React, { useEffect, useState } from 'react';
import {
    CardItemModel,

} from '@progress/sitefinity-nextjs-sdk/widgets';

import {sanitizerHTML} from "../../../utils/Sanitizer";

export function TabsListDesktop({ items }: { items: CardItemModel[] }) {
    const [tabActiva, setTabActiva] = useState<string | null>(null);

    useEffect(() => {
        if (items.length > 0) {
            setTabActiva(items[0].Original.Id);
        }
    }, [items]);

    const itemActivo = items.find((item) => item.Original.Id == tabActiva);

    return (
        <div className='container-layout'>
            <div className='container-requisitos hidden lg:block'>
                {/* TABS */}
                <div className='border-b border-gray-300 mb-6 container-tabs'>
                    {items.map((item) => (
                        <button
                            key={item.Original.Id}
                            onClick={() => setTabActiva(item.Original.Id)}
                            className={`tab-button ${tabActiva === item.Original.Id ? 'active-tab' : ''}`}
                        >
                            {item.Original.Title}
                        </button>
                    ))}
                </div>

                {/* TAB ACTIVA */}
                {itemActivo &&
                    (itemActivo?.Original?.Img?.[0] ? (
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                marginTop: '1rem',
                                // flexWrap: 'wrap',
                                width: '100%',
                                gap: '20px',
                                alignItems: 'center',
                            }}
                        >
                            <figure
                                style={{
                                    flex: '1 1 30%',
                                    margin: 0,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <img
                                    data-sf-image-responsive='true'
                                    src={itemActivo.Original.Img[0].Url}
                                    alt={itemActivo.Original.Img[0].AlternativeText || ''}
                                    style={{ height: '280px', objectFit: 'fill' }}
                                    title={itemActivo.Original.Img[0].AlternativeText || ''}
                                />
                            </figure>
                            <div
                                style={{
                                    flex: '1 1 60%',
                                    textAlign: 'justify',
                                    marginTop: '15px',
                                    lineHeight: '30px',
                                    fontSize: '17px',
                                    fontFamily: "Source Sans Pro', sans-serif",
                                }}
                            >
                               
                                  <div className="content-list">{sanitizerHTML(itemActivo.Original.Content)} </div>
                            </div>
                        </div>
                    ) : (
                        <div className='tab-item text-left space-y-3 mb-6'>
                         
                              <div className="content-list">{sanitizerHTML(itemActivo.Original.Content)} </div>
                        </div>
                    ))}
            </div>
        </div>
    );
}

