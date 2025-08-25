'use client';
import { WidgetContext, htmlAttributes } from '@progress/sitefinity-nextjs-sdk';
import { FrameTextEntity } from './frameText.entity';
import './frameText.css';



export function FrameText(props: WidgetContext<FrameTextEntity>) {
    const dataAttributes = htmlAttributes(props);
    const titulo = props.model.Properties.Titulo;
    const texto = props.model.Properties.Texto;

    return (
        <div {...dataAttributes} className='frame-container'>
            <p className='titulo-frame'>{titulo}</p>
            <p className='text-frame'>{texto}</p>
        </div>
    );
}
