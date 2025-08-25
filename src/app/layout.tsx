'use client';

import 'bootstrap/dist/css/bootstrap.css';
import './../index.css';
import { useEffect } from 'react';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        // Cargar JS de bootstrap solo en cliente
        if (process.env.NODE_ENV === 'development') {
            import('bootstrap/dist/js/bootstrap.bundle.js');
        } else {
            import('bootstrap/dist/js/bootstrap.bundle.min.js');
        }

        // Configurar autocomplete="off" globalmente para todos los formularios
        const configureAutocomplete = () => {
            const forms = document.querySelectorAll('form');
            forms.forEach((form) => {
                form.setAttribute('autocomplete', 'off');
            });

            // También para inputs individuales si es necesario
            const inputs = document.querySelectorAll('input, select, textarea');
            inputs.forEach((input) => {
                if (!input.hasAttribute('autocomplete')) {
                    input.setAttribute('autocomplete', 'off');
                }
            });
        };

        // Ejecutar inmediatamente
        configureAutocomplete();

        // Observer para formularios que se cargan dinámicamente
        const observer = new MutationObserver(() => {
            configureAutocomplete();
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true,
        });

        // Cleanup
        return () => observer.disconnect();
    }, []);

    return (
        <html lang='en'>
            <head>
                <link rel='stylesheet' href='/fonts/SourceSansPro/stylesheet.css' />
                <link rel='stylesheet' href='/fonts/Duplex/stylesheet.css' />
            </head>
            <body className='container-fluid'>{children}</body>
        </html>
    );
}
