'use client';
import React from 'react';
import { useEffect, useState } from 'react';
import { WidgetContext, htmlAttributes } from '@progress/sitefinity-nextjs-sdk';
import { ButtonWidgetEntity } from './button.entity';
import './button.css';
export function ButtonWidget(props: WidgetContext<ButtonWidgetEntity>) {
    


    const [shouldHide, setShouldHide] = useState(false);

    useEffect(() => {
        // Rutas donde no se debe mostrar el componente flotante
        const hideOnRoutes = [
        '/administracion/aplicaciones',
        '/administracion/beneficios',
        '/administracion/manuales',
        '/administracion/directorio',

    ];
        const styleModifySpaceButton=[
            '/inicio',]

        const checkRoute = () => {
            // Obtener el path actual
            const currentPath = window.location.pathname;

            // Verificar si el path actual está en el arreglo de rutas donde ocultar el componente
            if (hideOnRoutes.includes(currentPath)) {
                setShouldHide(true);
            } else {
                setShouldHide(false);
            }
        };

        // Modificar estilo del botón en rutas específicas
        const modifyButtonStyle = () => {   
            // Obtener el path actual
            const currentPath = window.location.pathname;
            if (styleModifySpaceButton.includes(currentPath)) {
                const buttonElement = document.querySelector('.directorio_contenedor_right') as HTMLElement;
                if (buttonElement) {
                  
                    buttonElement.style.bottom = '20px'; // Cambia este valor según tus necesidades
                }
            }
        }

        // Ejecutar al montar el componente
        checkRoute();
        modifyButtonStyle();
        // Escuchar cambios de ruta
        window.addEventListener('popstate', checkRoute);

        // Limpiar el listener al desmontar
        return () => {
            window.removeEventListener('popstate', checkRoute);
        };
    }, []); // Solo se ejecuta una vez al montar el componente


    if (shouldHide) {
        return null;
    }

 
    const dataAttributes = htmlAttributes(props);
    const text = props.model?.Properties.Text;
    const link = props.model?.Properties.link.href;
    const alineacion: any = props.model?.Properties.showButton;
    const colortext = props.model?.Properties.colortext;
    const Background = props.model?.Properties.Background;

    const Border = props.model?.Properties.Border;

    let back = '';
    if (Background === 'background_color') {
        back = props.model?.Properties.color;
    } else if (Background === 'background_transparent') {
        back = 'transparent';
    } else {
        back = 'transparent';
    }

    let classN = 'justify-start';
    // Aquí podrías agregar validaciones y estilos adicionales según sea necesario.
    if (alineacion === 'rigth') {
        classN = 'justify-end';
    } else if (alineacion === 'center') {
        classN = 'justify-center';
    }

    let radius = '0px';
    if (Border === 'border') {
        classN = classN + ' border border-[' + props.model?.Properties.colorBorder + ']';
        radius = '8px';
    } else {
        classN = classN + ' no_border';
    }

    return (
        <div className='directorio_contenedor_right'>
            <div
                className={`w-full flex btn-width ${classN}`}
                {...dataAttributes}
                style={{
                    borderRadius: '10px',
                    backgroundColor: back,
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '0.5rem',
                    transition: 'transform 0.3s ease',
                    transform: 'scale(1)',
                    cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                }}
            >
                <a
                    className='!w-full  flex btn justify-content-center'
                    style={{
                        border: 'none',
                        color: colortext,
                        display: 'flex',
                        gap: '0.5rem',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                    href={link}
                    role='button'
                >
                    <img
                        style={{ height: '21px', width: '25px' }}
                        src='/images/default-source/bm-intranet/icons/telefono-icon.png'
                    ></img>
                    <span className='text_buttom_directorio_sticky'>{text}</span>
                </a>
            </div>
        </div>
    );
}