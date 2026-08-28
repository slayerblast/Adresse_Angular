import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {FormulaireAdresse} from './formulaire-adresse/formulaire-adresse';
import {Map} from './map/map';
import {ListeAdresses} from './liste-adresses/liste-adresses';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormulaireAdresse, Map, ListeAdresses],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  rechercheActive = false;
  protected readonly title = signal('adresse_angular');
}
