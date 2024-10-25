export interface Inventory {
    id: number;
    productId: number;
    storeId: number;
    code: string;
    quantity: number;
  }
  
 
  export interface CreateInventoryDto {
    productId: number;
    storeId: number;
    code: string;
    quantity: number;
  }