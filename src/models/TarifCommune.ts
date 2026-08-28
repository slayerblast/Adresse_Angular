export interface TarifCommune {
  codeInsee: string;

  prixMoyen: number;
  prixMedian: number;
  prixM2: number;
  nombreTransactions: number;

  prixMoyenN1: number;
  prixMedianN1: number;
  prixM2N1: number;
  nombreTransactionsN1: number;

  variationPrixMoyenPct: number;
  variationPrixMedianPct: number;
  variationPrixM2Pct: number;
  variationNombreTransactionsPct: number;

  dateDebutPeriodeN: string;
  dateFinPeriodeN: string;
  dateDebutPeriodeN1: string;
  dateFinPeriodeN1: string;

  dateCalcul: string;
}
