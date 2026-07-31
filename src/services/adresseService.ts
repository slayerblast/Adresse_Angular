import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Adresse {
  id: string;
  id_fantoir: string;
  numero: string;
  rep: string;
  nom_voie: string;
  code_postal: string;
  code_insee: string;
  nom_commune: string;
  code_insee_ancienne_commune: string;
  nom_ancienne_commune: string;
  x: number;
  y: number;
  lon: number;
  lat: number;
  type_position: string;
  alias: string;
  nom_ld: string;
  libelle_acheminement: string;
  nom_afnor: string;
  source_position: string;
  source_nom_voie: string;
  certification_commune: number;
  cad_parcelles: string;
}

@Injectable({
  providedIn: 'root'

})
export class AdresseService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/adresses';
  private dernierCodePostal?: string;
  private derniereRue?: string;
  private derniereCommune?: string;
  private adressesSubject = new BehaviorSubject<Adresse[]>([]);
  adresses$ = this.adressesSubject.asObservable();
  private adresseSelectionneeSubject =
    new BehaviorSubject<Adresse | null>(null);
  adresseSelectionnee$ =
    this.adresseSelectionneeSubject.asObservable();
  pageIndex = 0;
  sauvegarderCritereRecherche(
    codePostal?: string,
    rue?: string,
    commune?: string
  ) {
    this.dernierCodePostal = codePostal;
    this.derniereRue = rue;
    this.derniereCommune = commune;
  }
  chargerPage(page: number): Observable<any> {
    return this.rechercherAdresses(
      this.dernierCodePostal,
      this.derniereRue,
      this.derniereCommune,
      page
    );
  }
  // Pagination
  private totalElementsSubject =
    new BehaviorSubject<number>(0);

  totalElements$ =
    this.totalElementsSubject.asObservable();

  private pageSizeSubject =
    new BehaviorSubject<number>(20);

  pageSize$ =
    this.pageSizeSubject.asObservable();

  selectionnerAdresse(adresse: Adresse) {
    this.adresseSelectionneeSubject.next(adresse);
  }

  setAdresses(adresses: Adresse[]) {
    this.adressesSubject.next(adresses);
  }

  setPagination(totalElements: number, pageSize: number) {
    this.totalElementsSubject.next(totalElements);
    this.pageSizeSubject.next(pageSize);
  }

  rechercherAdresses(
    codePostal?: string,
    rue?: string,
    commune?: string,
    page: number = 0
  ): Observable<any> {

    let params = new HttpParams();

    if (codePostal) {
      params = params.set('codePostal', codePostal);
    }

    if (rue) {
      params = params.set('rue', rue);
    }

    if (commune) {
      params = params.set('commune', commune);
    }

    params = params
      .set('page', page)
      .set('size', 20);

    return this.http.get<any>(this.apiUrl, { params });
  }
}
