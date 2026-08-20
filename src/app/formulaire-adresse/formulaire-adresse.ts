import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AdresseService } from '../../services/adresseService';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';

@Component({
  selector: 'app-formulaire-adresse',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './formulaire-adresse.html',
  styleUrl: './formulaire-adresse.css',
})
export class FormulaireAdresse {
  private adresseService = inject(AdresseService);
  private searchSubject = new Subject<string>();
  messageErreur = 'Veuillez renseigner au moins un champ';
  nomRue = '';
  codePostal = '';
  commune = '';
  rechercheDynamique = '';

  ngOnInit() {
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(search => {

      if (search.trim().length < 3) {
        this.adresseService.setSuggestions([]);
        this.adresseService.setAdresses([]);
        return;
      }

      this.adresseService
        .autocomplete(search)
        .subscribe(result => {
          this.adresseService.setSuggestions(result);

        });
    });
  }

  get formulaireValide(): boolean {
    return !!(this.nomRue.trim() || this.codePostal.trim() || this.commune.trim());
  }
  onSubmit() {
    this.adresseService.sauvegarderCritereRecherche(this.codePostal, this.nomRue, this.commune);
    this.adresseService
      .rechercherAdresses(this.codePostal, this.nomRue.toLowerCase(), this.commune.toLowerCase(), 0)
      .subscribe((data: any) => {
        this.adresseService.pageIndex = 0;
        this.adresseService.setAdresses(data.content);
        this.adresseService.setPagination(data.totalElements, data.size);
      });
  }
  onRechercheChange(): void {
    this.searchSubject.next(this.rechercheDynamique);
  }

}
