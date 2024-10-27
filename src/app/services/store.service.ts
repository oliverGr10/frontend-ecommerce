import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store } from '../interface/Store';
import { environment } from '../../enviroments/environment';


@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private apiUrl = `${environment.apiUrl}/stores`;

  constructor(private http: HttpClient) {}

  getStores(): Observable<Store[]> {
    return this.http.get<Store[]>(this.apiUrl);
  }
}
