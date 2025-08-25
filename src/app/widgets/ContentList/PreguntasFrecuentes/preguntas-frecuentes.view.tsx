'use client'
import React, { useState } from 'react'
import { CardsListViewProps, ContentListEntity } from '@progress/sitefinity-nextjs-sdk/widgets'
import './PreguntaFrecuente.css'
import {sanitizerHTML} from "../../../utils/Sanitizer";
export  function  PreguntasFrecuentesView (props: CardsListViewProps<ContentListEntity>) {
    const items = [...props.items].reverse(); 

    return (
        <div className="flex w-full justify-center p-6 lg:px-[400px]">
            <div className="space-y-2">
                {items.map((item, index) => (
                    <PreguntaAcordion 
                        key={item.Original.Id || index}
                        pregunta={item.Original.Title || ''}
                        respuesta={item.Original.Content || ''}
                        index={index}
                    />
                ))}
            </div>
        </div>
    )
}


interface PreguntaAcordionProps {
    pregunta: string;
    respuesta: string;
    index: number;
}

const PreguntaAcordion = ({ pregunta, respuesta, index }: PreguntaAcordionProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="border-b border-[#CB801B]">
            <button
                onClick={toggleAccordion}
                className="w-full flex justify-between items-center py-4 px-0 text-left  transition-colors duration-200 focus:outline-none bg-transparent"
                aria-expanded={isOpen}
                aria-controls={`accordion-content-${index}`}
            >
                <span className="preguntas_frecuentes_questions pr-4">
                    {pregunta}
                </span>

                <div className='w-4 h-4'>
                    <img src="/imgs/suma_icon.png" alt="" className='w-full h-full object-contain'/>
                </div>
                
            </button>
            
            <div
                id={`accordion-content-${index}`}
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
            >
                <div className="pb-4 text-gray-600 text-sm md:text-base leading-relaxed">
                    <div
                            title={respuesta}
                                        className='contenido-card'
                                    >
                                    {sanitizerHTML(respuesta)}
                                    </div>
                </div>
            </div>
        </div>
    )
}