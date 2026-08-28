import { Injectable,inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TarifCommune } from '../models/TarifCommune';

@Injectable({
  providedIn: 'root'
})
export class TarifCommuneService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/adresses';
  getTarifCommune(codeInsee: string): Observable<TarifCommune> {
    return this.http.get<TarifCommune>(
    `${this.apiUrl}/communes/${codeInsee}/tarif`
  );
}
}
