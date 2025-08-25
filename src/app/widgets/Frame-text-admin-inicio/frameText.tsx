'use client';
import { useState, useEffect } from 'react';
import { WidgetContext, htmlAttributes } from '@progress/sitefinity-nextjs-sdk';
import { FrameTextAdminInicioEntity } from './frameText.entity';
import { useCurrentUser } from '../../hooks/useCurrentUser';

export function FrameTextAdminInicio(props: WidgetContext<FrameTextAdminInicioEntity>) {
    const { user } = useCurrentUser();
    const [isInitialized, setIsInitialized] = useState(false);
    const dataAttributes = htmlAttributes(props);
    const titulo = props.model.Properties.Titulo;
    
    useEffect(() => {
        // Marcar como inicializado cuando user cambie de undefined a cualquier valor (incluso null)
        if (user !== undefined) {
            setIsInitialized(true);
        }
    }, [user]);
    
    // No renderizar hasta que se haya inicializado y haya un usuario válido
    if (!isInitialized || !user) {
        return null;
    }

    return (
        <div {...dataAttributes} style={{display: 'flex', flexDirection: 'row', borderBottom: '1px solid #538F61', marginBottom: '64px'}}>
            <p className='Title-inicio1' style={{marginRight: '16px'}}>{titulo}</p>
            <p className='Title-inicio2'>{'  '+user.firstName}</p>
        </div>
    );
}