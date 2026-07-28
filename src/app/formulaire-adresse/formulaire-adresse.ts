import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AdresseService } from '../../services/adresseService';

@Component({
  selector: 'app-formulaire-adresse',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './formulaire-adresse.html',
  styleUrl: './formulaire-adresse.css',
})
export class FormulaireAdresse {
  private adresseService = inject(AdresseService);
  messageErreur = 'Veuillez renseigner au moins un champ';
  nomRue = '';
  codePostal = '';
  commune = '';

  get formulaireValide(): boolean {
    return !!(this.nomRue.trim() || this.codePostal.trim() || this.commune.trim());
  }
  onSubmit() {
    this.adresseService.sauvegarderCritereRecherche(
      this.codePostal,
      this.nomRue,
      this.commune
    );
    this.adresseService
      .rechercherAdresses(this.codePostal, this.nomRue, this.commune,0)
      .subscribe((data: any) => {
        this.adresseService.setAdresses(data.content);
        this.adresseService.setPagination(data.totalElements, data.size);
      });
  }
}
