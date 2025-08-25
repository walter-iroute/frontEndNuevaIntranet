import { useEffect, useState } from 'react';

export interface CurrentUser {
    id: string;
    firstName: string;
    userName: string;
    email?: string;
    roles?: string;
    profile?: any; // Puedes definir un tipo más específico según la estructura del profile
    IsAuthenticated?: boolean;
}

export function useCurrentUser() {
    const [user, setUser] = useState<CurrentUser | null>(null);

    useEffect(() => {
        const getCurrentUser = async () => {
            try {
                // Primera llamada API - datos básicos del usuario
                const resp = await fetch('/api/default/users/current');
                if (!resp.ok) throw new Error('Error al obtener el usuario');

                const data = await resp.json();
                const { value } = data;

                // Segunda llamada API - roles y profile
                const email = value.Email;
                const resp2 = await fetch(`/api/profile-rol?email=${email}`);

                let roles: any = null;
                let profile: any = null;

                if (resp2.ok) {
                    const profileData = await resp2.json();

                    roles = profileData.role || null;
                    profile = profileData.profile || null;
                } else {
                    console.warn('Error al obtener roles y profile del usuario');
                }

                const mappedUser: CurrentUser = {
                    id: value.Id,
                    firstName: value.FirstName,
                    userName: value.UserName,
                    email: value.Email,
                    roles: roles,
                    profile: profile,
                    IsAuthenticated: value.IsAuthenticated,
                };

                setUser(mappedUser);
            } catch (err) {
                console.error('Error en getCurrentUser:', err);
            }
        };

        getCurrentUser();
    }, []);

    return { user };
}
