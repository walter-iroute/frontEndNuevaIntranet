import React from 'react'
import { CardsListViewProps, ContentListEntity } from '@progress/sitefinity-nextjs-sdk/widgets'
import {PreguntasFrecuentesView} from './preguntas-frecuentes.view'

export  function PreguntasFrecuentes(props: CardsListViewProps<ContentListEntity>) {
  return (
    <div>
        <PreguntasFrecuentesView {...props} />
    </div>
  )
}
