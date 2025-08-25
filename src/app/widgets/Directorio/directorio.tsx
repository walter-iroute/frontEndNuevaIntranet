'use client';
import { useState, useEffect, useMemo } from 'react';
import { WidgetContext, htmlAttributes } from '@progress/sitefinity-nextjs-sdk';
import './directorio.css';
import { DirectorioEntity } from './directorio.entity';
import { useGetAllUsers, UserLdap } from '../../hooks/useAllUsers'; // Ajusta la ruta según tu estructura

// Interfaz para mapear UserLdap a la estructura del directorio
interface IEmpleados {
    id: string;
    title: string;
    extension: string;
    cargo: string;
    area: string;
    departamento: string;
    zona: string;
    sucursal: string;
    jefeInmediato: string;
}

// Limpia y valida strings, retorna valor por defecto si está vacío o inválido
function cleanString(value: any, defaultValue: string = ''): string {
    if (
        !value ||
        typeof value !== 'string' ||
        value.trim() === '' ||
        value === 'System.Byte[]' ||
        value === 'null' ||
        value === 'undefined'
    ) {
        return defaultValue;
    }
    return value.trim();
}

// Genera un ID único usando username, identificacion o fullName
function generateUniqueId(user: UserLdap): string {
    const username = cleanString(user.username);
    const identificacion = cleanString(user.identificacion);
    const fullName = cleanString(user.fullName);
    return (
        cleanString(user.ldapId) !== ''
            ? user.ldapId
            : username || identificacion || fullName || Math.random().toString(36).substring(2, 12)
    );
}

// Opcional: Analiza datos para estadísticas y logging
function analyzeUserData(users: UserLdap[]) {
    let conNombre = 0;
    let sinNombre = 0;
    users.forEach(u => {
        if (cleanString(u.fullName)) conNombre++;
        else sinNombre++;
    });
}

// Mapea UserLdap[] a IEmpleados[], robusto y sin duplicados
function mapUserLdapToEmpleados(users: UserLdap[]): IEmpleados[] {
    const empleadosMap: Record<string, IEmpleados> = {};
    let omitidos = 0;
    let duplicados = 0;

    users.forEach((user) => {
        const fullName = cleanString(user.fullName);
        if (!fullName) {
            omitidos++;
            return; // omitir si no tiene nombre
        }

        // Genera clave única combinando nombre y extensión (solo si ambos no están vacíos)
        const extension = cleanString(user.extesion);
        const uniqueKey = `${fullName}-${extension}`;

        if (empleadosMap[uniqueKey]) {
            duplicados++;
            return; // evitar duplicados
        }

        empleadosMap[uniqueKey] = {
            id: generateUniqueId(user),
            title: fullName,
            extension: extension,
            cargo: cleanString(user.cargo),
            area: cleanString(user.department),
            departamento: cleanString(user.department),
            zona: cleanString(user.zona),
            sucursal: cleanString(user.office),
            jefeInmediato: cleanString(user.manager, 'No disponible'),
        };
    });

    return Object.values(empleadosMap).sort((a, b) => {
        const extA = parseInt(a.extension) || 0;
        const extB = parseInt(b.extension) || 0;
        if (extB !== extA) return extB - extA;
        return a.title.localeCompare(b.title);
    });
}

export function Directorio(props: WidgetContext<DirectorioEntity>) {
    const dataAttributes = htmlAttributes(props);

    // Usar el hook personalizado en lugar del entity
    const { users, loading, error } = useGetAllUsers();

    const [empleados, setEmpleados] = useState<IEmpleados[]>([]);
    const [buscador, setBuscador] = useState('');
    const [cargoSeleccionado, setCargoSeleccionada] = useState('');
    const [areaseleccionado, setAreaSeleccionada] = useState('');
    const [mostrarSugerencias, setMostrarSugerencias] = useState(false);
    const [resultadoBusqueda, setResultadoBusqueda] = useState<IEmpleados[] | null>(null);
    // Mostrar paginacion
    const [paginaActual, setPaginaActual] = useState(1);
    const [empleadosFiltradasPaginadas, SetEmpleadosFiltradasPaginadas] = useState<IEmpleados[]>([]);
    const empleadosPorPagina = 5; // Display 5 cards per page

    // Efecto para cargar y mapear los usuarios cuando se obtienen del hook
    useEffect(() => {
        if (!loading && users.length > 0) {
            // Opcional: analizar datos
            analyzeUserData(users);
            const mappedEmpleados = mapUserLdapToEmpleados(users);
            setEmpleados(mappedEmpleados);
        } else if (!loading) {
            setEmpleados([]);
        }
    }, [users, loading]);

    // Filtrar para buscar (ignora campos en blanco en los filtros)
    const handleButtonFilter = () => {
        const filtrosVacios = buscador.trim() === '' && cargoSeleccionado.trim() === '' && areaseleccionado.trim() === '';

        if (filtrosVacios) {
            setResultadoBusqueda(null);
            return;
        }

        // Filtrado robusto, ignora campos en blanco
        const filtrados = empleados.filter((item) => {
            const nombre = item.title.toLowerCase().trim();
            const busqueda = buscador.toLowerCase().trim();
            const cargo = item.cargo.toLowerCase().trim();
            const cargoSel = cargoSeleccionado.toLowerCase().trim();
            const area = item.area.toLowerCase().trim();
            const areaSel = areaseleccionado.toLowerCase().trim();

            // Solo filtra si el campo filtro no está vacío
            const nombreCoincide = busqueda ? nombre.includes(busqueda) : true;
            const cargoCoincide = cargoSel ? cargo === cargoSel : true;
            const areaCoincide = areaSel ? area === areaSel : true;

            return nombreCoincide && cargoCoincide && areaCoincide;
        });
        setResultadoBusqueda(filtrados);
    };

    //Nombres Unicos
    const nombresUnicos = new Set();
    const apellidosNombresBuscador = empleados.filter((item) => {
        const nombre = item.title.toLowerCase();
        const coincide = nombre.startsWith(buscador.toLowerCase());

        if (coincide && !nombresUnicos.has(nombre)) {
            nombresUnicos.add(nombre);
            return true;
        }

        return false;
    });

    const cargosFiltrados = useMemo(() => {
        const cargosUnicos = new Set();
        empleados.map((item) => {
            const { cargo } = item;
            if (cargo && cargo.trim() != '') {
                cargosUnicos.add(cargo.trim());
            }
        });
        return Array.from(cargosUnicos).sort();
    }, [empleados]);

    const areasFiltrados = useMemo(() => {
        const areasUnicos = new Set();
        empleados.map((item) => {
            const { area } = item;
            if (area && area.trim() != '') {
                areasUnicos.add(area.trim());
            }
        });
        return Array.from(areasUnicos).sort();
    }, [empleados]);

    // Efecto del click de las lista de nombre
    useEffect(() => {
        const handleClickOutside = (event: any) => {
            if (!event.target.closest('#inuptborder') && !event.target.closest('.list-group')) {
                setMostrarSugerencias(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    // Efecto para manejar la paginación cuando empleado
    useEffect(() => {
        const base = resultadoBusqueda ?? empleados;
        const indiceUltimo = paginaActual * empleadosPorPagina;
        const indicePrimero = indiceUltimo - empleadosPorPagina;
        const paginados = base.slice(indicePrimero, indiceUltimo);

        SetEmpleadosFiltradasPaginadas(paginados);
    }, [resultadoBusqueda, empleados, paginaActual, empleadosPorPagina]);

    // Calculo Total de Paginas
    const base = resultadoBusqueda ?? empleados;
    const totalPaginas = Math.ceil(base.length / empleadosPorPagina);

    //Funciones para gestionar cambios de página
    const cambiarPagina = (numeroPagina: number) => {
        setPaginaActual(numeroPagina);
    };

    // Mostrar loading state
    if (loading) {
        return (
            <div className='container-fluid p-2 mt-5' {...dataAttributes}>
                <div className='d-flex justify-content-center align-items-center' style={{ minHeight: '200px' }}>
                    <p>Cargando directorio de empleados...</p>
                </div>
            </div>
        );
    }

    // Mostrar error state
    if (error) {
        return (
            <div className='container-fluid p-2 mt-5' {...dataAttributes}>
                <div className='d-flex justify-content-center align-items-center' style={{ minHeight: '200px' }}>
                    <p className='text-danger'>Error al cargar empleados: {error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className='container-fluid p-2  mt-5 ' {...dataAttributes}>
            <div className='container-busqueda grid gap-4 md:grid-cols-3 shadow p-3  bg-body-tertiary rounded'>
                <div className='container_filter'>
                    <label htmlFor='inuptborder' className='label_title'>
                        Apellidos y Nombres
                    </label>
                    <div
                        className='input-wrapper'
                        style={{
                            background: '#fff',
                            position: 'relative',
                            maxWidth: '100%',
                            width: '100%',
                        }}
                    >
                        {/* Imagen al inicio */}
                        <img
                            src='/assets/search_v2.svg'
                            alt='Buscar'
                            style={{
                                position: 'absolute',
                                left: '10px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                width: '20px',
                                height: '20px',
                                pointerEvents: 'none', // no bloquea clics en input
                            }}
                        />

                        {/* Input con padding a la izquierda */}
                        <input
                            type='text'
                            placeholder='Buscar...'
                            className='filter_input'
                            value={buscador}
                            onChange={(e) => {
                                setBuscador(e.target.value);
                                setMostrarSugerencias(true);
                            }}
                            style={{
                                paddingLeft: '40px', // espacio para la imagen
                                width: '100%',
                                height: '36px',
                                boxSizing: 'border-box',
                            }}
                        />

                        {/* Sugerencias */}
                        {buscador && mostrarSugerencias && (
                            <ul
                                className='list-group'
                                style={{
                                    position: 'absolute',
                                    top: '100%',
                                    left: 0,
                                    right: 0,
                                    zIndex: 10,
                                    background: '#fff',
                                    border: '1px solid #ddd',
                                    borderTop: 'none',
                                    maxHeight: '200px',
                                    overflowY: 'auto',
                                }}
                            >
                                {apellidosNombresBuscador.map((item) => (
                                    <li key={item.id} className='list-group-item p-0 border-0 bg-transparent'>
                                        <button
                                            type='button'
                                            className='w-full text-left cursor-pointer hover:bg-gray-200 px-3 py-2'
                                            onClick={() => {
                                                setBuscador(item.title);
                                                setMostrarSugerencias(false);
                                            }}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter' || e.key === ' ') {
                                                    setBuscador(item.title);
                                                    setMostrarSugerencias(false);
                                                }
                                            }}
                                        >
                                            {item.title}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>

                <div className='container_filter '>
                    <label htmlFor='selectCargo' className='label_title'>
                        Cargo
                    </label>

                    <select
                        className='form-select form-select-sm filter_size'
                        value={cargoSeleccionado}
                        onChange={(e) => setCargoSeleccionada(e.target.value)}
                    >
                        <option value=''>Buscar</option>
                        {cargosFiltrados.map((cargo, index) => (
                            <option key={index} value={String(cargo)}>
                                {' '}
                                {String(cargo)}
                            </option>
                        ))}
                    </select>
                </div>

                <div className='container_filter '>
                    <label htmlFor='selectArea' className='label_title'>
                        área
                    </label>

                    <select
                        className='form-select form-select-sm filter_size'
                        value={areaseleccionado}
                        onChange={(e) => setAreaSeleccionada(e.target.value)}
                    >
                        <option value=''>Buscar</option>

                        {areasFiltrados.map((areas, index) => (
                            <option key={index} value={String(areas)}>
                                {' '}
                                {String(areas)}
                            </option>
                        ))}
                    </select>
                </div>

                <button className=' filter_button mt-3' type='button' onClick={() => handleButtonFilter()}>
                    Buscar
                </button>
            </div>

            <div className='table-responsive'>
                <table className='table_container mt-5 table-auto border border-primary text-sm w-full'>
                    <thead className='table_header text-white'>
                        <tr>
                            {/* <th>Id</th> */}
                            <th style={{ width: '145px' }}>Apellidos y Nombres</th>
                            <th>Ext.</th>
                            <th>Cargo</th>
                            <th>Área</th>
                            <th>Dpto.</th>
                            <th>Zona</th>
                            <th>Sucursal</th>
                            <th style={{ width: '115px' }}>Jefe Inmediato</th>
                        </tr>
                    </thead>
                    <tbody className='table_tbody text-gray-800'>
                        {!empleados.length ? (
                            <tr className='hover:bg-gray-100 border-b'>
                                <td className='px-4 py-2'>No</td>
                                <td className='px-4 py-2'>Hay</td>
                                <td className='px-4 py-2'></td>
                                <td className='px-4 py-2'> Empleados </td>
                                <td className='px-4 py-2'>Disponibles</td>
                                <td className='px-4 py-2'>.</td>
                                <td className='px-4 py-2'>.</td>
                                <td className='px-4 py-2'>.</td>
                            </tr>
                        ) : resultadoBusqueda?.length === 0 ? (
                            <tr className='hover:bg-gray-100 border-b'>
                                <td className='px-4 py-2'></td>
                                <td className='px-4 py-2'>No</td>
                                <td className='px-4 py-2'>Se</td>
                                <td className='px-4 py-2'> encontraron </td>
                                <td className='px-4 py-2'>Coincidencias</td>
                                <td className='px-4 py-2'></td>
                                <td className='px-4 py-2'></td>
                                <td className='px-4 py-2'></td>
                            </tr>
                        ) : (
                            empleadosFiltradasPaginadas.map((item) => {
                                return (
                                    <tr key={item.id} className='hover:bg-gray-100 border-b'>
                                        {/* <td className="px-4 py-2">{item.id}</td> */}
                                        <td className='px-4 py-2'>{item.title}</td>
                                        <td className='px-4 py-2'>
                                            {' '}
                                            {item.extension?.match(/Ext\.?\s*(\d+)/)?.[1] ?? ''}
                                        </td>
                                        <td className='px-4 py-2'>{item.cargo}</td>
                                        <td className='px-4 py-2'>{item.area}</td>
                                        <td className='px-4 py-2'>{item.departamento}</td>
                                        <td className='px-4 py-2'>{item.zona}</td>
                                        <td className='px-4 py-2'>{item.sucursal}</td>
                                        <td className='px-4 py-2'>
                                            {item.jefeInmediato.match(/CN=([^,]+)/)?.[1] || 'No disponible'}
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan={9} className='p-5'>
                                <div className='flex justify-center items-center mt-6 gap-2'>
                                    {[...Array(totalPaginas)].map((_, index) => (
                                        <button
                                            key={index}
                                            className={`px-3 py-1 rounded ${paginaActual === index + 1 ? 'card_point--active text-white' : 'bg-gray-200'}`}
                                            onClick={() => cambiarPagina(index + 1)}
                                        >
                                            {index + 1}
                                        </button>
                                    ))}
                                </div>
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    );
}
