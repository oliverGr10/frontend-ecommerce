import { z } from "zod";

export  const inventorySchema = z.object({
    productId: z.number().int().min(1, 'El ID del producto es obligatorio.'),
    storeId: z.number().int().min(1, 'El ID del almacén es obligatorio.'),
    code: z.string(),
    quantity: z.number().min(1, 'La cantidad debe ser mayor a 0.')
  });
