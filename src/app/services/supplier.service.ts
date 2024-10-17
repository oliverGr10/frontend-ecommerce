import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Suppliers } from '../interface/suppliers';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {
  private apiUrl = 'http://localhost:8081/api/v1/suppliers';

  constructor(private http: HttpClient) { }

  addSupplier(supplier: any): Observable<any> {
    return this.http.post(this.apiUrl, supplier);
  }
  getSuppliers(): Observable<Suppliers[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
  getSupplierById(id: number): Observable<Suppliers> {
    return this.http.get<Suppliers>(`${this.apiUrl}/${id}`);  // apiUrl debe tener el endpoint para un solo proveedor
  }

  updateSupplier(supplier: Suppliers): Observable<Suppliers> {
    console.log('Datos del proveedor a actualizar:', JSON.stringify(supplier));
    
    return this.http.put<Suppliers>(this.apiUrl, supplier, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    }).pipe(
      catchError(this.handleError)
    );
  }
  deleteSupplier(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }
  

  private handleError(error: HttpErrorResponse) {
    console.error('Error detallado:', error);
    let errorMessage = 'Ocurrió un error desconocido';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error del cliente: ${error.error.message}`;
    } else {
      errorMessage = `Error del servidor: ${error.status} - ${error.statusText}`;
      console.error('Respuesta del servidor:', error.error);
    }
    return throwError(() => new Error(errorMessage));
  }
}