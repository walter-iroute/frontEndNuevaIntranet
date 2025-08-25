import React from 'react';
import './BeneficiosCard.css'; // Importar el archivo CSS

export interface BeneficiosCardProps {
    title: string;
    description: string;
    imageUrl?: string; // Si luego deseas mostrar la imagen
    link?: string; // Si luego deseas mostrar el link de la app
}

export function BeneficiosCard({ title, description, imageUrl, link }: BeneficiosCardProps) {
    let href = '';
    if (link) {
        try {
            const linkArr = JSON.parse(link);
            if (Array.isArray(linkArr) && linkArr.length > 0 && linkArr[0].href) {
                href = linkArr[0].href;
            }
        } catch (e) {
            // Si no es un JSON válido, usa el valor original
            href = link;
        }
    }
    return (
        <div className='container'>
            <div className='header'>
                <div className='leftSection'>
                    {imageUrl ? (
                        <img src={imageUrl} alt='icon beneficios' className='icon' />
                    ) : (
                        <div className='icon' style={{ backgroundColor: '#ccc' }} />
                    )}
                    <p className='titulo-cards'>{title}</p>
                </div>
            </div>
            <div className='description'>
                <p className='text-cards'>{description}</p>
            </div>

            <div className='button' style={{ display: 'flex', justifyContent: 'right' }}>
                <a href={href} className='button-beneficios' target='_blank' rel='noopener noreferrer'>
                    <p className='text-button-cards'>Conocer mas</p>
                </a>
            </div>
        </div>
    );
}
