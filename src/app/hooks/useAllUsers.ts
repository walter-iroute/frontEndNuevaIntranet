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
        // API call comentada temporalmente
        // const resp = await fetch('/api/users');
        // if (!resp.ok) throw new Error('Error al obtener los usuarios');
        // const jsonData = await resp.json();
        // const data: UserLdap[] = jsonData.data;
 
        // Datos de prueba - JSON con 5 usuarios
        const data: UserLdap[] = [
          {
            ldapId: "ldap001",
            fullName: "María González Rodríguez",
            username: "mgonzalez",
            email: "maria.gonzalez@company.com",
            identificacion: "1234567890",
            zona: "Norte",
            phoneNumber: "555-03920404 - Ext. 3302",
            extesion: "3920404 - Ext. 3302",
            cargo: "Gerente de Ventas",
            codeOffice: "OFF001",
            office: "Oficina Principal",
            department: "Ventas",
            manager: "CN=fdgdfdfg,CN=Users,DC=lab,DC=local",
            grado: "Senior",
            birthDay: "30/07/1985", // Hoy para prueba
            hireDay: "23/07/2018",
            enabled: true
          },
          {
            ldapId: "ldap002",
            fullName: "Juan Carlos Mendoza",
            username: "jmendoza",
            email: "juan.mendoza@company.com",
            identificacion: "0987654321",
            zona: "Sur",
            phoneNumber: "555-0102",
            extesion: "3920404 - Ext. 3302",
            cargo: "Desarrollador Frontend",
            codeOffice: "OFF002",
            office: "Oficina Tecnología",
            department: "IT",
            manager: "CN=Administrador,CN=Users,DC=lab,DC=local",
            grado: "Middle",
            birthDay: "31/07/2018",
            hireDay: "23/07/2019", // Hoy para prueba
            enabled: true
          },
          {
            ldapId: "ldap003",
            fullName: "Carmen Elena Vásquez",
            username: "cvasquez",
            email: "carmen.vasquez@company.com",
            identificacion: "1122334455",
            zona: "Centro",
            phoneNumber: "555-0103",
            extesion: "3920404 - Ext. 3302",
            cargo: "Analista de Marketing",
            codeOffice: "OFF003",
            office: "Oficina Marketing",
            department: "Marketing",
            manager: "Roberto Silva",
            grado: "Junior",
            birthDay: "23/07/1992", // Hoy para prueba
            hireDay: "23/07/2018",
            enabled: true
          },
          {
            ldapId: "ldap004",
            fullName: "Roberto Silva Torres",
            username: "rsilva",
            email: "roberto.silva@company.com",
            identificacion: "5544332211",
            zona: "Este",
            phoneNumber: "555-0104",
            extesion: "3920404 - Ext. 3302",
            cargo: "Director de Marketing",
            codeOffice: "OFF004",
            office: "Oficina Central",
            department: "Marketing",
            manager: "CEO",
            grado: "Director",
            birthDay: "23/07/2018",
            hireDay: "23/07/2018", // Hoy para prueba
            enabled: true
          },
          {
            ldapId: "ldap005",
            fullName: "Ana Patricia López",
            username: "alopez",
            email: "ana.lopez@company.com",
            identificacion: "6677889900",
            zona: "Oeste",
            phoneNumber: "555-0105",
            extesion: "3920404 - Ext. 3302",
            cargo: "Jefe de Desarrollo",
            codeOffice: "OFF005",
            office: "Oficina IT",
            department: "IT",
            manager: "CTO",
            grado: "Senior",
            birthDay: "23/07/2018", // Hoy para prueba
            hireDay: "23/07/2018",
            enabled: true
          },
          {
            ldapId: "ldap005",
            fullName: "Ana Patricia López",
            username: "alopez",
            email: "walter.villamar@iroute.com.ec",
            identificacion: "6677889900",
            zona: "Oeste",
            phoneNumber: "555-0105",
            extesion: "3920404 - Ext. 3302",
            cargo: "Jefe de Desarrollo",
            codeOffice: "OFF005",
            office: "Oficina IT",
            department: "IT",
            manager: "CTO",
            grado: "Senior",
            birthDay: "07/08/2018", // Hoy para prueba
            hireDay: "23/07/2018",
            enabled: true
          }
        ];
 
        // Simular delay de API
        await new Promise(resolve => setTimeout(resolve, 1000));
 
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