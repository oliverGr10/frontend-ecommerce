import { jwtDecode } from 'jwt-decode'; 
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, tap } from 'rxjs';
import { throwError } from 'rxjs'; 

interface DecodedToken {
  sub: string;
  id: number;
  fullName: string;
  username: string;
  authorities: string[];
  iat: number;
  exp: number;
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private apiUrl = 'http://localhost:8081/api/v1/auth';
  private loggedIn = false;
  private userRole: string | null = null;

  constructor(private http: HttpClient) {}


  signup(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, userData);
  }


  login(credentials: { username: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      map((response: any) => {
        if (response && response.token) {
          const decodedToken = jwtDecode(response.token) as DecodedToken;
          console.log('Decoded token:', decodedToken);
          const role = this.determineRole(decodedToken.authorities);
          return { ...response, role };
        }
        return response;
      }),
      tap((response: any) => {
        if (response && response.token && response.role) {
          localStorage.setItem('token', response.token);
          this.setLoggedIn(true);
          this.setUserRole(response.role); 
        }
      }),
      catchError(error => {
        console.error('Error en login:', error);
        return throwError(() => new Error('Error en el proceso de login'));
      })
    );
  }

  private determineRole(authorities: string[] | string): string {
    // Verificar si authorities es un array
    if (Array.isArray(authorities)) {
      if (authorities.includes('ADMIN')) return 'ADMIN';
    } else if (typeof authorities === 'string') {
      // Si es una cadena, manejarlo como antes
      if (authorities === 'ADMIN') return 'ADMIN';
    }
    return 'USER';
  }

  setLoggedIn(status: boolean) {
    this.loggedIn = status;
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  setUserRole(role: string): void {
    this.userRole = role;
  }

  getUserRole(): string | null {
    return this.userRole;
  }

  isAdmin(): boolean {
    return this.userRole === 'ADMIN';
  }

  logout(): void {
    localStorage.removeItem('token');
    this.setLoggedIn(false);
    this.setUserRole('');
  }
}