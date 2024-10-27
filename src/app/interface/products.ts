export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  categoryId: number;
  supplierId: number;
  minStock?: number;
  images: ProductImage[];
  orders?: number;
}

export interface ProductImage {
  id?: number;
  imageUrl: string;
  imageBase64: string;
  imageName: string;
}

export interface ProductFormData extends Omit<Product, 'id'> {}
