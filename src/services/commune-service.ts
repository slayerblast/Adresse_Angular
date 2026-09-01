import { Injectable, inject, signal } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommuneService {
  private http = inject(HttpClient);
  //private apiUrl = 'http://localhost:8080/api/adresses';
  getContours() {
    return this.http.get<any>('http://localhost:8080/api/adresses/communes/contour');
    }
  }
