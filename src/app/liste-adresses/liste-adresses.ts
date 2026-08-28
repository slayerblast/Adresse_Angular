import { ChangeDetectorRef, Component, inject, ViewChild } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Adresse, AdresseService } from '../../services/adresseService';
import { AdresseFormatterService } from '../../services/adresse-formatter-service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { TarifCommune } from '../../models/TarifCommune';

@Component({
  selector: 'app-liste-adresses',
  standalone: true,
  imports: [MatPaginator,DecimalPipe],
  templateUrl: './liste-adresses.html',
  styleUrl: './liste-adresses.css',
})
export class ListeAdresses {
  private adresseService = inject(AdresseService);
  adresseFormatter = inject(AdresseFormatterService);
  private cdr = inject(ChangeDetectorRef);
  adresses: Adresse[] = [];
  tarifCommune: TarifCommune | null = null;
  totalElements = 0;
  pageSize = 20;
  pageIndex = 0;

  readonly distance = this.adresseService.distanceMetre;

  selectionnerAdresse(adresse: Adresse) {
    this.adresseService.selectionnerAdresse(adresse);
    console.log("tarif selectionné"+this.adresseService.tarifCommuneSelectionnee$)
  }
  ngOnInit() {
    this.adresseService.adresses$.subscribe((adresses) => {
      this.adresses = adresses;
      this.pageIndex = this.adresseService.pageIndex;
      this.cdr.detectChanges();
    });
    this.adresseService.tarifCommuneSelectionnee$.subscribe((tarifCommune)=>{
      this.tarifCommune = tarifCommune;
      this.cdr.detectChanges();
      })
    this.adresseService.adressesTrouvees$
      .subscribe((adresses: Adresse[]) => {
        this.adresses = adresses;
      });

    this.adresseService.suggestions$
      .subscribe(adresses => {

        if (adresses.length > 0) {
          this.adresses = adresses;
          this.totalElements = adresses.length;
          this.cdr.detectChanges();
        }
      });

    this.adresseService.totalElements$.subscribe((total) => {
      this.totalElements = total;
      this.cdr.detectChanges();
    });

    this.adresseService.pageSize$.subscribe((size) => {
      this.pageSize = size;
    });
  }
  onPageChange(event: PageEvent) {
    console.log('Nouvelle page :', event.pageIndex);
    this.pageIndex = event.pageIndex
    this.adresseService.pageIndex = event.pageIndex
    this.adresseService
      .chargerPage(event.pageIndex)
      .subscribe(data => {
        this.adresseService.setAdresses(
          data.content
        );

        this.adresseService.setPagination(
          data.totalElements,
          data.size
        );
      });
  }

}
