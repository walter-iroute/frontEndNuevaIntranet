import React from 'react'
import { CardsListViewProps, CardItemModel, ContentListEntity } from '@progress/sitefinity-nextjs-sdk/widgets';
// import {CardListClient} from '../CardListCustom/CardListClient'
import { CarruselRecursosView } from './carrusel-recursos.view';


export function CarruselRecursos(props: CardsListViewProps<ContentListEntity>) {
    
    return (
        <>
            <CarruselRecursosView {...props}/>
        </>
    )
}
