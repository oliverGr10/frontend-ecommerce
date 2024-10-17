import { z } from "zod";

export const SupplierEditSchema = z.object({
    id: z.number().optional(),
    name: z.string().min(1, "El nombre es requerido"),
    contact: z.string().min(1, "El contacto es requerido"),
    phone: z.string().min(1, "El teléfono es requerido"),
    email: z.string().email("Dirección de correo electrónico inválida"),
    address: z.string().min(1, "La dirección es requerida"),
    country: z.string().min(1, "El país es requerido"),
    pay_terms: z.string().optional(),
    logo: z.string().optional().nullable() // Hacemos el logo opcional y permitimos que sea null
  });
  
  export type Suppliers = z.infer<typeof SupplierEditSchema>;