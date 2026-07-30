import { Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdresseFormatterService {

  /**
   * Remplace les caractères spéciaux par des espaces
   * Supprime les accents
   * Réduit les espaces multiples
   */
  normalize(value?: string | null): string {
    if (!value) {
      return '';
    }

    return value
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-zA-Z0-9 ]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  /**
   * Indique si le rep correspond à un appartement
   */
  isAppartement(rep?: string | null): boolean {
    return /^app?t?/i.test(rep?.trim() ?? '');
  }

  /**
   * Indique si le rep correspond à un logement
   */
  isLogement(rep?: string | null): boolean {
    return /^log/i.test(rep?.trim() ?? '');
  }

  /**
   * Indique si le rep doit être affiché en ligne 1
   */
  isComplementLogement(rep?: string | null): boolean {
    return this.isAppartement(rep) || this.isLogement(rep);
  }

  /**
   * Ligne 1
   */
  buildLine1(rep?: string | null): string {

    if (!rep) {
      return '';
    }

    const value = rep.trim();

    if (this.isAppartement(value)) {
      const numero = value.replace(/^app?t?/i, '').replace(/[^0-9]/g, '');
      return numero ? `Appartement ${numero}`.substring(0,38) : 'Appartement';
    }

    if (this.isLogement(value)) {
      const numero = value.replace(/^log/i, '').replace(/[^0-9]/g, '');
      return numero ? `Logement ${numero}`.substring(0,38) : 'Logement';
    }

    return '';
  }

  /**
   * Ligne 2
   */
  buildLine2(typePosition?: string | null): string {
    return this.normalize(typePosition).toUpperCase().substring(0,38);
  }

  /**
   * Ligne 3
   */
  buildLine3(
    numero?: string | number | null,
    rep?: string | null,
    nomAfnor?: string | null
  ): string {

    const parts: string[] = [];

    if (numero) {
      parts.push(String(numero));
    }

    if (rep && !this.isComplementLogement(rep)) {
      parts.push(this.normalize(rep).toUpperCase());
    }

    if (nomAfnor) {
      parts.push(nomAfnor.trim());
    }

    return parts.join(' ').trim().substring(0,38);
  }

  /**
   * Ligne 4
   */
  buildLine4(nomLd?: string | null): string {

    if (!nomLd) {
      return '';
    }

    return this.normalize(nomLd).toUpperCase().substring(0,38);
  }

  /**
   * Ligne 5
   */
  buildLine5(
    codePostal?: string | null,
    libelleAcheminement?: string | null
  ): string {

    return [codePostal, libelleAcheminement]
      .filter(Boolean)
      .join(' ')
      .trim()
      .substring(0,38);
  }
}
