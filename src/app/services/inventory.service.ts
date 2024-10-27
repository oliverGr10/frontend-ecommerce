import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { environment } from '../../enviroments/environment';
import { Inventory } from '../interface/inventory';



@Injectable({
  providedIn: 'root'
})
export class InventoryService {
    private apiUrl = `${environment.apiUrl}/inventories`;
    private inventorySubject = new BehaviorSubject<Inventory[]>([]);
    inventory$ = this.inventorySubject.asObservable();
  
    constructor(private http: HttpClient) {
      this.loadInitialProducts();
    }

    private loadInitialProducts(): void {
      this.getInventories().subscribe(inventories => {
          this.inventorySubject.next(inventories);
      });
  }
  
  getProductsPaginated(page: number, limit: number): Observable<Inventory[]> {
    const params = {
      page: page.toString(),
      limit: limit.toString()
    };
    return this.http.get<Inventory[]>(this.apiUrl, { params })
  }
  refreshInventory(): void {
    this.getInventories().subscribe(inventories => {
      console.log('Actualizando inventarios:', inventories);
      this.inventorySubject.next(inventories);
    });
  }
  
  getInventories(): Observable<Inventory[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      tap(response => console.log('Respuesta del servidor:', response)),
      map(response => response.map(item => ({
        ...item,
        quantity: typeof item.quantity === 'number' ? item.quantity : 0,
      } as Inventory)))
    );
  }

    getInventoryById(id: number): Observable<Inventory> {
      return this.http.get<Inventory>(`${this.apiUrl}/${id}`);
    }
  

    generateCode(productId: number, storeId: number): string {
      const timestamp = new Date().getTime();
      return `INV-${storeId}-${productId}-${timestamp}`;
    }
  

    createInventory(inventory: Inventory): Observable<Inventory> {
      return this.http.post<Inventory>(this.apiUrl, inventory).pipe(
        tap(response => {
          console.log('Inventario creado:', response);
          this.refreshInventory(); 
        })
      );
    }
  
 
    generateInventory(inventoryData: Partial<Inventory>): Observable<Inventory> {
      return this.http.post<Inventory>(`${this.apiUrl}/generate`, {
        productId: inventoryData.productId,
        storeId: inventoryData.storeId,
        quantity: inventoryData.quantity || 0,
        available: inventoryData.available !== undefined ? inventoryData.available : true,
      });
    }

    deleteInventory(id: number): Observable<void> {
      return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
    updateQuantity(id: number, quantity: number): Observable<any> {
      return this.http.patch(`${this.apiUrl}/${id}`, { quantity });
    }
  }