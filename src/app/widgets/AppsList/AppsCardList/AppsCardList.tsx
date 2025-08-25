import './AppCardList.css'; // Importar el archivo CSS
import Dropdown from 'react-bootstrap/Dropdown';

export interface Modulo {
    Id: string;
    Title: string;
    link: string;
    // ...otros campos si es necesario...
}

export interface BeneficiosCardProps {
    title: string;
    imageUrl?: string; // si luego deseas mostrar la imagen
    modulos: Modulo[];
    linkApp: string; // si luego deseas mostrar el link de la app
}

export function AppsCardlist({ title, imageUrl, modulos, linkApp }: BeneficiosCardProps) {
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
                            // Si no es un JSON válido, muestra un error en la consola
                            console.error('Error parsing modulo.link as JSON:', e);
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
                            title='abir modulo'
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
            <a href={href} className='button-beneficios buttonAppList' title={href} target='_blank' rel='noopener noreferrer'>
                <p className='text-button-cards'>Abrir</p>
            </a>
        );
    }

    return (
        <div className='appCardListContainer'>
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

            {contenido}
        </div>
    );
}
