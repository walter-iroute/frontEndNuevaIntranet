'use client';
import React from 'react'
import './Banner.css'
import { LinkModel } from '@progress/sitefinity-widget-designers-sdk';

interface CreditosProductivosBannerProps {
  title?: string;
  description?: string;
  buttonText?: string;
  buttonLink?: LinkModel;
  imageUrlMovil?: string;
  imageUrlDesktop?: string;
  imageAlt?: string;
}

const BannerHero : React.FC<CreditosProductivosBannerProps> = ({
  title = "Créditos Productivos",
  description = "Respaldamos tu crecimiento con el capital de trabajo que necesitas para tus MIPYMES.",
  buttonText = "Conoce más",
  buttonLink = null,
  imageUrlMovil = "/imgs/banner-test.png",
  imageUrlDesktop = "/imgs/banner-test-desktop.png",
  imageAlt = "Banner Hero"
}) => {
  return (
    <div className="w-full h-max bg-[#295135] overflow-hidden z-0">
      {/* Container principal */}
      <div className="min-h-[500px] lg:!min-h-[500px] lg:!h-[500px] 2xl:!h-[400px] 3xl:!h-[500px] flex flex-wrap lg:flex-nowrap lg:flex-row-reverse">
        
        {/* Imagen optimizada */}
        <OptimizedImageNextJSFixed imageUrlMovil={imageUrlMovil} imageUrlDesktop={imageUrlDesktop} imageAlt={imageAlt} />

        <div className='w-full h-full py-9 flex flex-col gap-9 sm:w-1/2 lg:pl-[120px] lg:pr-[85px] 2xl:pl-[196px] 2xl:pr-[118px] lg:items-start 2xl:items-start lg:gap-3.5 2xl:gap-3.5 container-text-hero'>
            <div className='w-[507px] px-9 sm:p-0 flex flex-col'>
                <p className='title_banner_hero'>{title}</p>
                <p className='description_banner_hero'>{description}</p>   

                <a href={buttonLink?.href || ''} target={buttonLink?.target || '_self'} className='border border-[#CB801B] rounded-lg hover:bg-[#203F29] button_banner_hero'>{buttonText}</a> 
            </div>
        </div>

      </div>
    </div>
  )
}

export default BannerHero

interface OptimizedImageProps {
  imageUrlMovil: string;
  imageUrlDesktop: string;
  imageAlt: string;
  className?: string;
}

export const OptimizedImageNextJSFixed: React.FC<OptimizedImageProps> = ({
  imageUrlMovil,
  imageUrlDesktop,
  imageAlt,
  className = ""
}) => {
 return (
    <div className={`w-full h-full sm:h-[500px] 2xl:h-full lg:w-1/2 ${className}`}>
      {/* Imagen móvil */}
      <img
        src={imageUrlMovil}
        alt={imageAlt}
        className="w-full h-full !object-cover sm:hidden"
      />
      
      {/* Imagen desktop */}
      <img
        src={imageUrlDesktop}
        alt={imageAlt}
        className="hidden sm:block w-full h-full !object-cover"
      />
    </div>
  );
};