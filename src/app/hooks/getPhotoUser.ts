import { useEffect, useState } from 'react';

export interface GetPhotoUser {
    mail: string;
    PhotoBase64: string;
    HasPhoto: boolean;
}

export function useGetPhotoUser(email: string) {
    const [user, setUser] = useState<GetPhotoUser | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!email) {
            setUser(null);
            return;
        }

        const getPhotoUser = async () => {
            setLoading(true);
            setError(null);
            
            try {
                const resp = await fetch(`/api/get-photo?email=${encodeURIComponent(email)}`);
                
                if (!resp.ok) {
                    throw new Error(`Error ${resp.status}: ${resp.statusText}`);
                }
                
                const data = await resp.json();
                
                const mappedUser: GetPhotoUser = {
                    mail: data.mail,
                    PhotoBase64: data.PhotoBase64,
                    HasPhoto: data.HasPhoto,
                };
                
                setUser(mappedUser);
            } catch (err) {
                const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
                console.error('Error al obtener foto del usuario:', errorMessage);
                setError(errorMessage);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        getPhotoUser();
    }, [email]);

    return { user, loading, error };
}