import { z } from 'zod';

export const productImageSchema = z.object({
  imageUrl: z.string().url('URL de imagen inválida'),
  imageBase64: z.string(),
  orders: z.number().int().min(0).max(2)
});

export const productSchema = z.object({
  name: z.string()
    .min(1, 'El nombre es requerido')
    .max(100, 'El nombre no puede exceder los 100 caracteres'),
  description: z.string()
    .min(10, 'La descripción debe tener al menos 10 caracteres')
    .max(500, 'La descripción no puede exceder los 500 caracteres'),
  price: z.number()
    .positive('El precio debe ser positivo')
    .min(0.01, 'El precio mínimo es 0.01'),
  categoryId: z.number()
    .int('La categoría debe ser un número entero')
    .positive('Debe seleccionar una categoría'),
  supplierId: z.number()
    .int('El proveedor debe ser un número entero')
    .positive('Debe seleccionar un proveedor'),
  images: z.array(productImageSchema)
    .min(1, 'Debe agregar al menos una imagen')
    .max(3, 'Máximo 3 imágenes permitidas')
});

export type ProductSchemaType = z.infer<typeof productSchema>;