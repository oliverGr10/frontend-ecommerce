import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
  })
  export class SuppliersService {
    private apiUrl = 'http://localhost:8081/api/v1/suppliers';
  
    constructor(private http: HttpClient) { }
  
    // Método para agregar un proveedor
    addSupplier(supplier: any): Observable<any> {
      return this.http.post<any>(this.apiUrl, supplier);
    }
  
    // Método para editar un proveedor por su ID
    editSupplier(id: string, updatedSupplier: any): Observable<any> {
      return this.http.patch<any>(`${this.apiUrl}/${id}`, updatedSupplier);
    }
  
    // Método para eliminar un proveedor por su ID
    deleteSupplier(id: string): Observable<any> {
      return this.http.delete<any>(`${this.apiUrl}/${id}`);
    }
  
    // Método para buscar proveedores por nombre
    searchSuppliersByName(name: string): Observable<any[]> {
      return this.http.get<any[]>(`${this.apiUrl}?name=${name}`);
    }
  
    // Función para obtener el logo de la empresa utilizando Clearbit
    getCompanyLogo(domain: string): string {
      return `https://logo.clearbit.com/${domain}`;
    }
  }
  