import { ChangeDetectorRef, Component, inject, ViewChild } from '@angular/core';
import { Adresse, AdresseService } from '../../services/adresseService';
import { AdresseFormatterService } from '../../services/adresse-formatter-service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-liste-adresses',
  standalone: true,
  imports: [MatPaginator],
  templateUrl: './liste-adresses.html',
  styleUrl: './liste-adresses.css',
})
export class ListeAdresses {
  private adresseService = inject(AdresseService);
  adresseFormatter = inject(AdresseFormatterService);
  private cdr = inject(ChangeDetectorRef);
  adresses: Adresse[] = [];
  totalElements = 0;
  pageSize = 20;
  pageIndex = 0;

  selectionnerAdresse(adresse: Adresse) {
    this.adresseService.selectionnerAdresse(adresse);
  }
  ngOnInit() {
    this.adresseService.adresses$.subscribe((adresses) => {
      this.adresses = adresses;
      this.cdr.detectChanges();
      this.pageIndex = this.adresseService.pageIndex;
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
