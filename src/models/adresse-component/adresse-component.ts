import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';

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

@Component({
  selector: 'app-adresse-component',
  imports: [],
  templateUrl: './adresse-component.html',
  styleUrl: './adresse-component.css',
})
export class AdresseComponent {
  private http = inject(HttpClient);
  adresses: Adresse[] = [];

  ngOnInit() {
    this.http.get<Adresse[]>('/api/adresses')
      .subscribe(data => {
        this.adresses = data;
      });
  }
}
