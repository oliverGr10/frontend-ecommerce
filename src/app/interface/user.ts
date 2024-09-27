

export interface User{
    username: string;
  email: string;
  password: string;
  role: string; // Puedes usar un enum si prefieres
  nombre: string; // Nuevo campo
  apellidos: string; // Nuevo campo
  tipo_documento: 'DNI' | 'Pasaporte' | 'Cédula'; // Nuevo campo (puedes usar un enum)
  numero_documento: string; // Nuevo campo
}