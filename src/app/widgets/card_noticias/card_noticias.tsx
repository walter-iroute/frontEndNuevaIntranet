'use client';
import { WidgetContext, htmlAttributes, getCustomAttributes, combineClassNames, getMinimumWidgetContext } from "@progress/sitefinity-nextjs-sdk";
import {CardNoticiasEntity, IBanner} from "./card_noticias.entity";
import { useEffect, useState } from "react";
import "./card_noticias.css";

export function CardNoticias(props: WidgetContext<CardNoticiasEntity>){
    const dataAttributes = htmlAttributes(props);
    const link = process.env.NEXT_PUBLIC_SF_CMS_URL;
    const url = `${link}/api/default`;
    // const [isExpanded, setIsExpanded] = useState(false); Ver mas
        const imagenId = props.model.Properties.Imagen?.ItemIdsOrdered?.[0];
    const [imagen, setImagen] = useState<IBanner | null>(null);
    const fetchBooks = async (url: string) => {
      if (!imagenId) return;
      try {
                const response = await fetch(`/api/default/images(${imagenId})`);
                const data = await response.json();
                setImagen(data);
            } catch (error) {
                console.error('Error al cargar imagen:', error);
            }

    };

    useEffect(()=>{
        fetchBooks(url)  
    },[]);

    return(
<div className="container-cursos row justify-content-center align-items-stretch"
     style={{ backgroundColor: `${props.model.Properties.BannerBackground}` }}
     {...dataAttributes}
>
  {/* Imagen */}
  <div className="col-md-6 d-flex p-0 "
       style={{ maxWidth: "512px",marginTop:"20px", maxHeight: "414px", height: "100%" }}>
  
    <picture className="w-100 h-100 ">
      {
        imagen ?
          <img
        src={imagen?.Url }
        title={imagen?.Title}
        alt={imagen?.Title}
        loading="lazy"
        className="rounded mt-2"
        style={{
          objectFit: "cover",
          width: "100%",
          height: "100%",
          borderRadius: "4px"
        }}
      />: 
      
     <img
        src= "/assets/checker.png"
    
        loading="lazy"
        className="rounded"
        style={{
          objectFit: "cover",
          width: "100%",
          height: "100%",
          borderRadius: "4px"
        }}/>



      }
    

    
    </picture>
  
  
  </div>


  {/* Contenido */}
  <div className="col-md-6 d-flex "
       style={{ maxWidth: "464px", maxHeight: "480px", height: "100%" }}>
    <section className="section_noticias_banner d-flex flex-column justify-content-between p-3 w-100">
      <header className="banner_cards" style={{ width: props.model.Properties.BannerWidth }}>
        <h3 className="banner_cards_Title px-5"
            style={{ minWidth: props.model.Properties.BannerMinWidth }}
            title={props.model.Properties.BannerTitle}>
          {props.model.Properties.BannerTitle}
        </h3>
      </header>

      <section>
        <h3 className="cards_noticias_gobernanzas_title" style={{ width:"100%"}}>{props.model.Properties.Title}</h3>
        <div className="cards_noticias_gobernanzas_linea"></div>
        <h4 className="cards_noticias_gobernanzas_title"  style={{ width:"100%"}}>{props.model.Properties.Subtitle}</h4>
        <p className="cards_noticias_gobernanzas_descripcion"
           title={props.model.Properties.Description}
           style={{ overflow: "hidden" }}>
          {props.model.Properties.Description}
        </p>
      </section>
    </section>
  </div>
</div>


    )

}
