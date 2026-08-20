import { Injectable, inject, signal } from '@angular/core';
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
  private adresseSelectionneeSubject = new BehaviorSubject<Adresse | null>(null);
  adresseSelectionnee$ = this.adresseSelectionneeSubject.asObservable();
  private suggestionsSubject = new BehaviorSubject<Adresse[]>([]);
  private readonly distanceMetreSignal = signal<number | undefined>(undefined);
  readonly distanceMetre = this.distanceMetreSignal.asReadonly();

  adressesTrouvees$ = this.adressesSubject.asObservable();
  suggestions$ = this.suggestionsSubject.asObservable();

  setSuggestions(adresses: Adresse[]) {this.suggestionsSubject.next(adresses);
  }

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

  autocomplete(
    q: string
  ): Observable<Adresse[]> {

    let params = new HttpParams();

    if (q) {
      params = params.set('q', q);
    }

    return this.http.get<Adresse[]>(
      `${this.apiUrl}/autocomplete`,
      { params }
    );
  }
rechercherAdressesProches(
    lat: number,
    lon: number
  ): void {

    this.http
      .get<Adresse[]>(`${this.apiUrl}/proches?lat=${lat}&lon=${lon}`)
      .subscribe(adresses => {
        console.log('Adresse trouvée :', adresses);
        this.adressesSubject.next(adresses);
        this.distanceMetreSignal.set(this.calculerDistance(lat,lon,adresses[0].lat,adresses[0].lon));
      });
  }

calculerDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {

  const rayonTerre = 6_371_000;

  const latDistance = this.versRadians(lat2 - lat1);
  const lonDistance = this.versRadians(lon2 - lon1);

  const a =
    Math.sin(latDistance / 2) * Math.sin(latDistance / 2)
    + Math.cos(this.versRadians(lat1))
    * Math.cos(this.versRadians(lat2))
    * Math.sin(lonDistance / 2)
    * Math.sin(lonDistance / 2);

  const c = 2 * Math.atan2(
    Math.sqrt(a),
    Math.sqrt(1 - a)
  );

  return rayonTerre * c;
}

private versRadians(degres: number): number {
  return degres * Math.PI / 180;
}
}
