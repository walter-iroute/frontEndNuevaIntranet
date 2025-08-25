import React from 'react';
import { CardsListViewProps } from '@progress/sitefinity-nextjs-sdk/widgets';
import { ContentListEntity } from '@progress/sitefinity-nextjs-sdk/widgets';
import {TabListAreasClient} from "./TabList-areas.client";
export async function TabsListAreaServer(props: CardsListViewProps<ContentListEntity>) {
  // Usar CardItemModel[] directamente de Sitefinity
  const initialItems = [...props.items];
  
  // Preparar attributes
  const contentListAttributes = { ...props.attributes };
  const classAttributeName = contentListAttributes['class'] ? 'class' : 'className';
  contentListAttributes[classAttributeName] += ' row row-cols-1 row-cols-md-3 bg-warning';
  contentListAttributes[classAttributeName] = contentListAttributes[classAttributeName].trim();
  
  // Pasar datos al Client Component
  return (
 <TabListAreasClient 
      initialItems={initialItems}
      contentListAttributes={contentListAttributes}
    />
  );
}