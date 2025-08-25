import React from 'react'
import { CardsListViewProps, ContentListEntity } from '@progress/sitefinity-nextjs-sdk/widgets';
// import {CardListClient} from '../CardListCustom/CardListClient'
import { CarruselProductoRelacionadosView } from './carrusel-productos-relacionados.view';


export function CarruselProductoRelacionados(props: CardsListViewProps<ContentListEntity>) {
    
    return (
        <>
            <CarruselProductoRelacionadosView {...props}/>
        </>
    )
}
