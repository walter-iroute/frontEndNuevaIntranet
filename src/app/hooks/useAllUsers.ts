import { useEffect, useState } from 'react';

export interface UserLdap {
    ldapId:          string;
    fullName?:       string;
    username?:       string;
    email?:          string;
    identificacion?: string;
    zona?:           string;
    phoneNumber?:    string;
    extesion?:       string;
    cargo?:          string;
    codeOffice?:     string;
    office?:         string;
    department?:     string;
    manager?:        string;
    grado?:          string;
    birthDay?:       string;
    hireDay?:        string;
    enabled?:        boolean;
}

export function useGetAllUsers() {
  const [users, setUsers] = useState<UserLdap[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        // Comentado temporalmente para usar datos de prueba
        const resp = await fetch('/api/users');
        if (!resp.ok) throw new Error('Error al obtener los usuarios');
        const jsonData = await resp.json();
        const data: UserLdap[] = jsonData.data;
        setUsers(data);

      } catch (err) {
        console.error(err)
        setError("Error al cargar los usuarios")
      } finally {
        setLoading(false);
      }
    };

    getAllUsers();
  }, []);

  return { users, loading, error } ;
}