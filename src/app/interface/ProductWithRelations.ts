import { Suppliers } from "../components/auth/schema/supplierEditSchema";
import { Category } from "./Category";
import { Product } from "./products";

export interface ProductWithRelations extends Product {
    category?: Category;
    supplier?: Suppliers;  // Note que uso Suppliers en lugar de Supplier para mantener tu nomenclatura
  }