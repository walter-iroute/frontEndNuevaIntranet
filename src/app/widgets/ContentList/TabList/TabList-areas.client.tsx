'use client';

import {  useState } from 'react';

import { CardItemModel} from '@progress/sitefinity-nextjs-sdk/widgets';
import {TabsListDesktop} from "./tab-list-desktop.view";
import {sanitizerHTML} from "../../../utils/Sanitizer";
interface CardsListClientProps {
    initialItems: CardItemModel[];
    contentListAttributes: any;
}

export function TabListAreasClient({
    initialItems,
    contentListAttributes
}: CardsListClientProps) {
    const [items, setItems] = useState<CardItemModel[]>(initialItems);
    
 const [activeTabId, setActiveTabId] = useState<string | null>(null);

    const toggleAccordion = (id: string) => {
    setActiveTabId((prev) => (prev === id ? null : id));
  };

    return (
    <div {...contentListAttributes} className="container-layout_tab-list">

      <div className="container-requisitos lg:hidden">
        {items.map(item => {
            const isActive = activeTabId === item.Original.Id;
            
            <h2 className="text-center font-semibold mb-6">{item.Original.Title}</h2>
          return (
            <div key={item.Original.Id} className='accordeon'>
              <div
                className="tab-accordeon"
                onClick={() => toggleAccordion(item.Original.Id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleAccordion(item.Original.Id);
                  }
                }}
              >
                <span>{item.Original.Title}</span>
                <i
                  className={`transition-transform duration-300 ${
                    isActive ? 'bi bi-dash-lg' : 'bi bi-plus-lg'
                  }`}
                  style={{ fontSize: "15px" }}
                ></i>
              </div>

              <div
                className={`transition-all duration-300 overflow-hidden ${
                  isActive ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
                style={{ fontSize: "15px" }}
              >
                
                 <div className="py-2 px-1 text-sm content-list">{sanitizerHTML(item.Original.Content)} </div>
                
              </div>
            </div>
          );
        })}
      </div>

       <TabsListDesktop items={items} /> 
    </div>
    );
}

