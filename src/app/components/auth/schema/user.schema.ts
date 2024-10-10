import { z } from 'zod';

export const userSchema = z.object({
  name: z.string().min(2, { message: "El nombre debe tener al menos 2 caracteres" }),
  lastName: z.string().min(2, { message: "El apellido debe tener al menos 2 caracteres" }),
  documentType: z.enum(["DNI", "Pasaporte", "Cédula"], { 
    errorMap: () => ({ message: "Seleccione un tipo de documento válido" })
  }),
  numDoc: z.string().min(8, { message: "El número de documento debe tener al menos 8 caracteres" }),
  email: z.string().email({ message: "Ingrese un correo electrónico válido" }),
  username: z.string().min(3, { message: "El nombre de usuario debe tener al menos 3 caracteres" }),
  password: z.string().min(8, { message: "La contraseña debe tener al menos 8 caracteres" }),
  role: z.enum(['USER', 'ADMIN']),
});

export type UserSchemaType = z.infer<typeof userSchema>;