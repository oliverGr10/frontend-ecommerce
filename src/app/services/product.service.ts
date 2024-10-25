import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, catchError, map, Observable, tap, throwError } from 'rxjs';
import { Product, ProductFormData } from '../interface/products';

@Injectable({
    providedIn: 'root'
  })
  export class ProductService {
    private apiUrl = 'http://localhost:8085/api/v1';
    private productsSubject = new BehaviorSubject<Product[]>([]);
    products$ = this.productsSubject.asObservable();
    constructor(private http: HttpClient) {
      this.loadInitialProducts();
    }
    private loadInitialProducts(): void {
      this.getProducts().subscribe(products => {
          this.productsSubject.next(products);
      });
  }
  

    getProductsPaginated(page: number, limit: number): Observable<Product[]> {
      const params = {
        page: page.toString(),
        limit: limit.toString()
      };
      return this.http.get<Product[]>(this.apiUrl, { params })
    }
  
  
    getProducts(): Observable<Product[]> {
      return this.http.get<Product[]>(`${this.apiUrl}/products`).pipe(
          tap(products => {
          }),
          catchError(error => {
              return throwError(() => error);
          })
      );
  }
  
    createProduct(product: any): Observable<Product> {
      return this.http.post<Product>(`${this.apiUrl}/products`, product).pipe(
          tap(newProduct => {
              const currentProducts = this.productsSubject.value;
              const updatedProducts = [...currentProducts, newProduct];
              this.productsSubject.next(updatedProducts);
          }),
          catchError(error => {
              return throwError(() => error);
          })
      );
  }
    
  
    updateProduct(id: number, product: ProductFormData): Observable<Product> {
      return this.http.put<Product>(`${this.apiUrl}/products/${id}`, product).pipe(
        catchError(this.handleError)
      );
    }
  
    deleteProduct(id: number): Observable<void> {
      return this.http.delete<void>(`${this.apiUrl}/products/${id}`).pipe(
        catchError(this.handleError)
      );
    }
    private handleError(error: HttpErrorResponse) {
      return throwError(() => new Error('An error occurred while processing your request'));
    }
    refreshProducts(): void {
      this.getProducts().subscribe(products => {
          this.productsSubject.next(products);
      });
    }
  }