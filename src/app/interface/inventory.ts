export interface Inventory {
    id?: number;
    productId: number;
    storeId: number;
    code: string;
    quantity: number;
    available?: boolean; 
    saleDetailDTO?: any; 
    buyDetailDTO?: any; 
    orderDetailDTO?: any; 
  }
  
