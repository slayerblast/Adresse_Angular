import { AfterViewInit, Component, inject } from '@angular/core';
import * as L from 'leaflet';
import { AdresseService } from '../../services/adresseService';
import { CommuneService } from '../../services/commune-service';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [],
  templateUrl: './map.html',
  styleUrl: './map.css',
})
export class Map implements AfterViewInit {

  private communeService = inject(CommuneService)
  private adresseService = inject(AdresseService);
  private map!: L.Map;
  private marker?: L.Marker;
  private markerRecherche?: L.Marker;
  private customIcon = L.icon({
  iconUrl: 'assets/leaflet/pin_map.png',
  shadowUrl: 'assets/leaflet/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

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

        if (!adresse) {

          return;}

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

        this.map.on('click', (event: L.LeafletMouseEvent) => {

          const lat = event.latlng.lat;
          const lon = event.latlng.lng;

          if (this.markerRecherche) {
            this.map.removeLayer(this.markerRecherche);
          }

          this.markerRecherche = L.marker(
            [lat, lon],
            { icon: this.customIcon }
          ).addTo(this.map);
        this.adresseService.rechercherAdressesProches(lat,lon)

        });
      this.loadContours();

  }

private loadContours(): void {
this.communeService.getContours()
  .subscribe((contours: any[]) => {
    contours.forEach((c: any) => {
      const geoJson = JSON.parse(c.contour);
      //console.log(c.prixM2,this.getOpacity(c.prixM2));
      L.geoJSON(geoJson, {
        style: {
          color: '#ff0000',
          weight: 0.5,
          opacity: 1,
          fillColor: '#ff9800',
          fillOpacity: this.getOpacity(c.prixM2)
        }

      }).addTo(this.map);
    });

  });

  }
private getOpacity(prix: number): number {
  const prixMin = 500;
  const prixMax = 20000;

  return Math.max(
    0.1,
    Math.min(
      0.8,
      (prix - prixMin) / (prixMax - prixMin)
    )
  );
}
}
