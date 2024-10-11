import { z } from 'zod';

export const loginSchema = z.object({
    username: z.string().min(1, 'El usuario no es válido'), // Cambiar a un string no vacío
    password: z.string().min(8, 'La contraseña debe tener al menos 8 caracteres')
});

export type LoginSchema = z.infer<typeof loginSchema>;