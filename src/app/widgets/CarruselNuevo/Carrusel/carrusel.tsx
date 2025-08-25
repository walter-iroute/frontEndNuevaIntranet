import React from 'react'
import { htmlAttributes, WidgetContext } from '@progress/sitefinity-nextjs-sdk'
import { CarruselEntity } from './carrusel.entity'
import { CarruselHero } from './carrusel-hero.view'


export function Carrusel(props: WidgetContext<CarruselEntity>) {
    const dataAttributes = htmlAttributes(props);
    const { Properties } = props.model;
    const data = Properties.Enlaces || [];

    const items2 = data.map((item: any) => ({
        title: item.contenido?.titulo || "",
        description: item.contenido?.contenido || "",
        buttonText: "Conoce más",
        buttonLink: item.contenido?.EnlaceCTA || "",
        imageUrlMovil: item.ImageMovil?.Url || "",
        imageUrlDesktop: item.ImageDesktop?.Url || "",
        imageAlt: item.ImageDesktop?.AlternativeText || ""
    }));


    return (
        <div {...dataAttributes} className=''>
            <CarruselHero items={items2} />
        </div>
    );
}