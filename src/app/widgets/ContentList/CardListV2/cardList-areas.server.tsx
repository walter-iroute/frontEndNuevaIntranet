import React from 'react';
import { CardsListViewProps, CardItemModel } from '@progress/sitefinity-nextjs-sdk/widgets';
import { ContentListEntity } from '@progress/sitefinity-nextjs-sdk/widgets';
import { CardListAreasClient } from './cardList-areas.client';

export async function CardListAreasServer(props: CardsListViewProps<ContentListEntity>) {
  // Usar CardItemModel[] directamente de Sitefinity
  const initialItems = [...props.items];
  
  // Preparar attributes
  const contentListAttributes = { ...props.attributes };
  const classAttributeName = contentListAttributes['class'] ? 'class' : 'className';
  contentListAttributes[classAttributeName] += ' row row-cols-1 row-cols-md-3';
  contentListAttributes[classAttributeName] = contentListAttributes[classAttributeName].trim();
  
  // Pasar datos al Client Component
  return (
    <CardListAreasClient 
      initialItems={initialItems}
      contentListAttributes={contentListAttributes}
    />
  );
}