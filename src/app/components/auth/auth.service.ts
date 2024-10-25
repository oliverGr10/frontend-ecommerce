import { jwtDecode } from 'jwt-decode'; 
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, map, Observable, tap } from 'rxjs';
import { throwError } from 'rxjs'; 
import { User } from '../../interface/user';

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
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8085/api/v1/auth';
  private loggedIn = false;
  private userRole: string | null = null;
  private userSubject = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) {
    this.loadUserFromLocalStorage(); 
  }

  private loadUserFromLocalStorage() {
    const token = localStorage.getItem('token');
    if (token) {
      this.loggedIn = true;
      const decodedToken = jwtDecode(token) as DecodedToken;
      this.userRole = this.determineRole(decodedToken.authorities);
    }
  }
  signup(user: User): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, user);
  }
  setUser(user: any): void {
    this.userSubject.next(user);
  }

  login(credentials: { username: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      map((response: any) => {
        if (response && response.token) {
          const decodedToken = jwtDecode(response.token) as DecodedToken;
          const role = this.determineRole(decodedToken.authorities);
          return { ...response, role };
        }
        return response;
      }),
      tap((response: any) => {
        if (response && response.token && response.role) {
          localStorage.setItem('token', response.token);
          this.loggedIn = true;
          this.userRole = response.role;
        }
      }),
      catchError((error) => {
        console.error('Error en login:', error);
        return throwError(() => new Error('Error en el proceso de login'));
      })
    );
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  getUserRole(): string | null {
    return this.userRole;
  }

  isAdmin(): boolean {
    return this.userRole === 'ADMIN';
  }

  logout(): void {
    localStorage.removeItem('token');
    this.loggedIn = false;
    this.userRole = null;
    this.setUser(null);
  }

  private determineRole(authorities: string[] | string): string {
    if (Array.isArray(authorities)) {
      if (authorities.includes('ADMIN')) return 'ADMIN';
    } else if (typeof authorities === 'string' && authorities === 'ADMIN') {
      return 'ADMIN';
    }
    return 'USER';
  }
  getUserData(): User | null {
    const token = localStorage.getItem('token');
    
    if (token) {
      try {
        const decodedToken: DecodedToken = jwtDecode<DecodedToken>(token);
        
        return {
          id: decodedToken.id.toString(), 
          name: decodedToken.fullName.trim(), 
          lastName: decodedToken.fullName.trim(), 
          documentType: 'DNI', 
          numDoc: '12345678', 
          email:'',
          username: decodedToken.username,
          password: '', 
          role: decodedToken.authorities.includes('ADMIN') ? 'ADMIN' : 'USER'
        };
        
      } catch (error) {
        console.error("Error al decodificar el token:", error);
        return null;
      }
    }
    
    return null; 
  }
  
}
