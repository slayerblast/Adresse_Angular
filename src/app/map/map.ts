import { AfterViewInit, Component, inject } from '@angular/core';
import * as L from 'leaflet';
import { AdresseService } from '../../services/adresseService';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [],
  templateUrl: './map.html',
  styleUrl: './map.css',
})
export class Map implements AfterViewInit {

  private adresseService = inject(AdresseService);

  private map!: L.Map;
  private marker?: L.Marker;

  ngAfterViewInit(): void {

    this.map = L.map('map').setView([48.8566, 2.3522], 13);

    L.tileLayer(
      'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 19,
        attribution: '&copy; OpenStreetMap'
      }
    ).addTo(this.map);

    this.marker = L.marker([48.8566, 2.3522])
      .addTo(this.map)
      .bindPopup('Paris');

    this.adresseService.adresseSelectionnee$
      .subscribe(adresse => {

        if (!adresse) {return;}

        this.map.setView(
          [adresse.lat, adresse.lon],
          18
        );

        if (this.marker) {
          this.map.removeLayer(this.marker);
        }

        this.marker = L.marker([
          adresse.lat,
          adresse.lon
        ])
          .addTo(this.map)
          .bindPopup(
            `${adresse.numero} ${adresse.nom_voie}`
          );
      });
  }
}
