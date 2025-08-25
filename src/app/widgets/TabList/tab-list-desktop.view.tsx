'use client';

import './tab-list.css';

import React, { useEffect, useState } from "react";
import {sanitizerHTML} from "../../utils/Sanitizer";

import {  SdkItem } from '@progress/sitefinity-nextjs-sdk/rest-sdk';

export function TabsListDesktop({ items }: { items: SdkItem[] }) {
  const [tabActiva, setTabActiva] = useState<string | null>(null);

  useEffect(() => {
    if (items.length > 0) {
      setTabActiva(items[0].Id)
    }
  }, [items]);

  const itemActivo = items.find(item => item.Id == tabActiva);

  return (
    <div className="container-layout">   
      <div className="container-requisitos hidden lg:block">
        {/* TABS */}
        <div className="border-b border-gray-300 mb-6 container-tabs">
          {items.map(item => (
            <button key={item.Id} 
            onClick={() => setTabActiva(item.Id)} 
            className={`tab-button ${tabActiva === item.Id ? 'active-tab' : ''}`}>
              {item.Title}
            </button>
          ))}
        </div>

        {/* TAB ACTIVA */}
        {itemActivo && (
          <div className="tab-item text-left  space-y-3 mb-6">
          
             <div className="content-list">{sanitizerHTML(itemActivo.Content)} </div>
          </div>

        )}
      </div>
    </div>
  )
}