import React from 'react';
import './styles.css';
import Dropdown from 'react-bootstrap/Dropdown';

export interface Modulo {
    Id: string;
    Title: string;
    link: string;
    // ...otros campos si es necesario...
}

export interface AppCardProps {
    title: string;
    description: string;
    imageUrl?: string; // si luego deseas mostrar la imagen
    linkApp?: string; // si luego deseas mostrar el link de la app
    modulos: Modulo[];
}

export function AppCard({ title, description, imageUrl, linkApp, modulos }: AppCardProps) {
    let contenido = null;



    if (modulos && modulos.length > 0) {
        contenido = (
            <Dropdown
                onSelect={(eventKey) => {
                    const modulo = modulos.find((m) => m.Id === eventKey);
                    if (modulo && modulo.link) {
                        let href = '';
                        try {
                            const linkArr = JSON.parse(modulo.link);
                            if (Array.isArray(linkArr) && linkArr.length > 0 && linkArr[0].href) {
                                href = linkArr[0].href;
                            }
                        } catch (e) {
                            // Si no es un JSON válido, no hace nada
                        }
                        if (href) {
                            window.open(href, '_blank');
                        }
                    }
                }}
            >
                <Dropdown.Toggle
                    className='dropdown-title'
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        backgroundColor: 'transparent',
                        borderRadius: '8px',
                        border: '1px solid #ccc', // puedes cambiar el color del borde si lo deseas
                        width: '185px',
                        height: '40px',
                        borderColor: '#295135',
                        fontSize: '1rem',
                        color: '#295135', // opcional, para que el texto sea visible con fondo transparente
                    }}
                    variant='success'
                    id='dropdown-basic'
                >
                    Modulos
                    <img src='/assets/arrow-dowm.svg'></img>
                </Dropdown.Toggle>
                <Dropdown.Menu
                    style={{
                        backgroundColor: 'white',
                        width: '185px',
                        // opcional, para que el texto sea visible con fondo transparente
                    }}
                >
                    {modulos.map((modulo) => (
                        <Dropdown.Item
                            className='dropdown-content'
                            style={{ color: '#295135' }} // opcional, para que el texto sea visible con fondo transparente
                            key={modulo.Id}
                            eventKey={modulo.Id}
                        >
                            {modulo.Title}
                        </Dropdown.Item>
                    ))}
                </Dropdown.Menu>
            </Dropdown>
        );
    } else {
        let href = '';
        if (linkApp) {
            try {
                const linkArr = JSON.parse(linkApp);
                if (Array.isArray(linkArr) && linkArr.length > 0 && linkArr[0].href) {
                    href = linkArr[0].href;
                }
            } catch (e) {
                // Si no es un JSON válido, usa el valor original
                href = linkApp;
            }
        }
        contenido = (
            <a href={href} className='button-cards' target='_blank' rel='noopener noreferrer'>
                <p className='text-button-cards'>Abrir</p>
            </a>
        );
    }

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <div style={styles.leftSection}>
                    {imageUrl ? (
                        <img src={imageUrl} alt='icon App' style={styles.icon} />
                    ) : (
                        <div style={{ ...styles.icon, backgroundColor: '#ccc' }} />
                    )}

                    <p className='titulo-cards'>{title}</p>
                </div>

                {contenido}
            </div>
            <div className='description-container'>
                <p className='text-cards'>Descripción de la app:</p>
                <p className='text-cards'>{description}</p>
            </div>
        </div>
    );
}

const styles = {
    container: {
        height: '170px',
        border: '1px solid #D1D3D4',
        borderRadius: '8px',
        paddingLeft: '16px',
        paddingTop: '24px',
        paddingBottom: '24px',
        paddingRight: '16px',
        width: '385px',
        backgroundColor: ' #EDEDEE',
    },
    header: {
        width: '100%',
        height: '40px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '8px',
    },
    icon: {
        width: '40px',
        height: '40px',
        borderRadius: '10%',
    },

    leftSection: {
        display: 'flex',
        gap: '1rem',
        alignItems: 'center',
    },

    description: {
        fontSize: '14px',
        color: '#555',
        marginBottom: '16px',
        heigth: '50px',
    },
    descriptionTitle: {
        fontSize: '14px',
        color: '#555',
        marginBottom: '16px',
        heigth: '50px',
    },
};
