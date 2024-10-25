import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";
import { Category } from "../interface/Category";

@Injectable({
    providedIn: 'root'
  })
  export class CategoryService {
    private apiUrl = 'http://localhost:8085/api/v1/categories';
  
    constructor(private http: HttpClient) {}

    getCategories(): Observable<Category[]> {
      return this.http.get<Category[]>(this.apiUrl).pipe(
        catchError((error) => {
          console.error('Error fetching categories', error);
          return throwError(() => new Error('Error fetching categories'));
        })
      );
    }
  }