import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-formulaire-adresse',
  standalone : true,
  imports: [FormsModule],
  templateUrl: './formulaire-adresse.html',
  styleUrl: './formulaire-adresse.css',
})
export class FormulaireAdresse {
  nomRue = '';
  codePostal = '';
  commune = '';

  onSubmit() {
    console.log({
      nomRue: this.nomRue,
      codePostal: this.codePostal,
      commune: this.commune
    });
  }
}
