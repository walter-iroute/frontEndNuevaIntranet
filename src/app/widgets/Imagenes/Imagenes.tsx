"use client";
import React from "react";
import { htmlAttributes, WidgetContext } from "@progress/sitefinity-nextjs-sdk";
import { ImagenesEntity } from "./Imagenes.entity";
import "./Imagenes.css";

export const Imagenes = (props: WidgetContext<ImagenesEntity>) => {
  const dataAttributes = htmlAttributes(props);
  const { Properties } = props.model;
  const data = Properties.Enlaces || [];

  const TextCentro = Properties.IsTextCenter ? 'title_contenedor_imagenes text-center': 'title_contenedor_imagenes'
  const items2 = data.map((item: any) => {
    let imageUrlDesktop = item.ImageDesktop?.Url || "";
    // Si la URL contiene el host, lo eliminamos para obtener la ruta relativa
    if (imageUrlDesktop.startsWith('http')) {
      const urlObj = new URL(imageUrlDesktop);
      imageUrlDesktop = urlObj.pathname + urlObj.search;
    }
    return {
      imageUrlDesktop,
      imageAlt: item.ImageDesktop?.AlternativeText || "",
    };
  });


  return (
<div {...dataAttributes} className="contenedor_general_plantilla_generica  mb-5">
  <header>
    <h2 className={TextCentro}>{Properties.Title}</h2>
  </header>

  <div className="row justify-content-center align-items-center  " style={{width:"100%"}}>
    {items2.map((item, index) => (
      <div key={index} className="container_imagenes_items ">
        <img
          src={item.imageUrlDesktop}
          alt={item.imageAlt}
          className="container_imagenes_items_img"
        />
      </div>
    ))}
  </div>
</div>

  );
};

