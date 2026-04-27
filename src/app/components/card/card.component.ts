import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QRCodeComponent } from 'angularx-qrcode';
import { AdherentService, Adherent } from '../../services/adherent.service';
import { MobileService } from '../../services/mobile.service';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, QRCodeComponent],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent implements OnInit {
  adherent: Adherent | null = null;
  qrData = '';
  dateAffichee = '';

  constructor(
    private adherentService: AdherentService,
    private mobileService: MobileService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.adherentService.getAdherent(1).subscribe({
      next: async (data) => {
        this.adherent = data;
        this.dateAffichee = this.formatDate(data.dateValidite);
        this.qrData = `${data.numeroAdherent} - ${data.nom} ${data.prenom}`;
        // Sauvegarde locale pour accès hors-ligne
        await this.mobileService.sauvegarder(data);
        this.cdr.detectChanges();
      },
      error: async () => {
        // Tentative de chargement hors-ligne
        const local = await this.mobileService.charger();
        this.adherent = local ?? {
          id: 1,
          nom: 'Naudin',
          prenom: 'Claire',
          numeroAdherent: 'HM-2026-00142',
          mutuelle: 'Harmonie Mutuelle',
          dateValidite: '2026-12-31',
        };
        this.dateAffichee = this.formatDate(this.adherent.dateValidite);
        this.qrData = `${this.adherent.numeroAdherent} - ${this.adherent.nom} ${this.adherent.prenom}`;
        this.cdr.detectChanges();
      },
    });
  }

  // Appelé par le bouton Partager
  async partager(): Promise<void> {
    if (this.adherent) {
      await this.mobileService.partager(this.adherent);
    }
  }

  formatDate(date: any): string {
    if (Array.isArray(date)) {
      return `${date[2]}/${date[1]}/${date[0]}`;
    }
    if (typeof date === 'string') {
      const [y, m, d] = date.split('-');
      return `${d}/${m}/${y}`;
    }
    return String(date);
  }
}
