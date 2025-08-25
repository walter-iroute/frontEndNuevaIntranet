'use client';
import { WidgetContext, htmlAttributes, getCustomAttributes, combineClassNames, getMinimumWidgetContext } from "@progress/sitefinity-nextjs-sdk";
import {BannerEntity, IBanner} from "./banner.entity";
import { useEffect, useState } from "react";
import "./banner.css";

export function Banner(props: WidgetContext<BannerEntity>){
        const dataAttributes = htmlAttributes(props);
        const link = process.env.NEXT_PUBLIC_SF_CMS_URL;
        const url = `${link}/api/default`;
        // NEXT_PUBLIC_SF_CMS_URL
        

      const [imagen, setImagen] = useState<IBanner | null>(null);
        const fetchBooks = async (url: string)=>{
        try {
            const ImagenId = props.model.Id;
           
              if (!ImagenId) {
                console.warn("No se encontró ID de imagen.");
                return;
            }
            (ImagenId);
            

            const response = await fetch( `${url}/images(${ImagenId})`);
           const data: IBanner = await response.json();
            setImagen(data);
                     (data);
                     

          
        } catch (error) {
            console.error("Error al cargar Imagenes:", error);
        }
    }

    useEffect(()=>{
        fetchBooks(url)  
      
        
    },[]);

    return(
      <>
<section className='d-flex gx-0 justify-content-center banner-layout'>
  <figure className="banner-figure">
    <img src={imagen?.Url} className="banner-image" alt={imagen?.Title} />
  </figure>

  <div className="col-md-8 banner-content" style={{ backgroundColor: `${props.model.Properties.BannerBackground}` }}
    {...dataAttributes}>
    <section className="banner-content-text">
      <h1 className="banner-content-title" style={{fontSize: props.model.Properties.FontSize}}>{props.model.Properties.Title}</h1>
      <p className="banner-content-description">{props.model.Properties.Description}</p>
    </section>
  </div>
</section>

  </>
    )

}
