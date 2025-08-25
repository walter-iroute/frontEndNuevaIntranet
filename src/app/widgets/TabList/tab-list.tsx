'use client'
import './tab-list.css';
import React, { useEffect, useState } from "react";
import { WidgetContext, htmlAttributes } from "@progress/sitefinity-nextjs-sdk";
import { TabsListDesktop } from './tab-list-desktop.view';
import { TabsListEntity } from "./tab-list.entity";
import { RestClient, SdkItem } from '@progress/sitefinity-nextjs-sdk/rest-sdk';
import {sanitizerHTML} from "../../utils/Sanitizer";
export function TabsList(props: WidgetContext<TabsListEntity>) {
  const [listItems, setListItems] = useState<SdkItem[]>([]);
  const [activeTabId, setActiveTabId] = useState<string | null>(null);


  const dataAttributes = htmlAttributes(props);
  const { model } = props;
  const { titulo, items} = model.Properties;
  
 
  const listId = items?.ItemIdsOrdered?.[0] || null;

    

  const getListItems = async (listId: string, status: string = 'Live') => {
    try {
      const response = await RestClient.getItems({
        type: "Telerik.Sitefinity.Lists.Model.ListItem",
      
        filter: `Status eq ${status} and ParentId eq '${listId}'`,
        fields: ['ParentId', 'Id', 'Title', 'Content']
      });

      
     
      setListItems(response.Items);
      
    } catch (err) {
      console.error("Error al obtener ítems de la lista:", err);
    }
  };

  useEffect(() => {
    if (listId) {
      getListItems(listId);
    }
  }, [listId]);
//ParentId
const listaItemsFiltrados = listItems.filter(item => item.ParentId === listId);


  
  const toggleAccordion = (id: string) => {
    setActiveTabId((prev) => (prev === id ? null : id));
  };

  return (
    <div {...dataAttributes} className="container-layout_tab-list">
      <h2 className="text-center font-semibold mb-6">{titulo}</h2>

      <div className="container-requisitos lg:hidden">
        {listaItemsFiltrados.map(item => {
          const isActive = activeTabId === item.Id;

          return (
            <div key={item.Id} className='accordeon'>
              <div
                className="tab-accordeon"
                onClick={() => toggleAccordion(item.Id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleAccordion(item.Id);
                  }
                }}
              >
                <span>{item.Title}</span>
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
             
                <div
                    title={item.Content}
                              className="py-2 px-1 text-sm content-list"
                            >
                            {sanitizerHTML(item.Content)}
                            </div>
              </div>
            </div>
          );
        })}
      </div>

      <TabsListDesktop items={listaItemsFiltrados} />
    </div>
  );
}
