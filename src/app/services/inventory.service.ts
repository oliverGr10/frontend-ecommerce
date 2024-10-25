import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../enviroments/environment';
import { CreateInventoryDto, Inventory } from '../interface/inventory';



@Injectable({
  providedIn: 'root'
})
export class InventoryService {
    private apiUrl = `${environment.apiUrl}/inventories`;
  
    constructor(private http: HttpClient) { }

    getInventories(): Observable<Inventory[]> {
      return this.http.get<Inventory[]>(this.apiUrl);
    }
  

    getInventoryById(id: number): Observable<Inventory> {
      return this.http.get<Inventory>(`${this.apiUrl}/${id}`);
    }
  

    getInventoryByCode(code: string): Observable<Inventory> {
      return this.http.get<Inventory>(`${this.apiUrl}/code/${code}`);
    }
  

    createInventory(inventory: CreateInventoryDto): Observable<Inventory> {
      return this.http.post<Inventory>(this.apiUrl, inventory);
    }
  
 
    generateInventory(data: any): Observable<any> {
      return this.http.post<any>(`${this.apiUrl}/generate`, data);
    }

    deleteInventory(id: number): Observable<void> {
      return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
  }