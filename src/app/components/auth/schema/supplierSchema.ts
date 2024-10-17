import { z } from 'zod';


export const supplierSchema = z.object({
    id: z.number().optional(),
    name: z.string().min(1, 'El nombre es obligatorio'),
    address: z.string().min(1, 'La dirección es obligatoria'),
    phone: z.string().min(10, 'El teléfono debe tener al menos 10 dígitos').regex(/^\+?[0-9\s-()]+$/, 'Formato de teléfono inválido'),
    email: z.string().email('Correo electrónico no válido'),
    country: z.string().min(1, 'El país es obligatorio'),
    contact: z.string().min(1, 'El contacto es obligatorio'),
    logo: z
    .string()
    .refine((value) => {
      
      return (
        value.startsWith('data:image/') || 
        value.startsWith('http://') || 
        value.startsWith('https://') 
      );
    }, 'Logo debe ser una URL o una imagen en base64')
    .optional(),
    pay_terms: z.string().min(1, 'Los términos de pago son obligatorios').optional(),
  });
  
  export type Supplier = z.infer<typeof supplierSchema>;

