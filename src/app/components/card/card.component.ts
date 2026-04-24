import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QRCodeComponent } from 'angularx-qrcode';
import { AdherentService, Adherent } from '../../services/adherent.service';

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

  constructor(private adherentService: AdherentService) {}

  ngOnInit(): void {
    this.adherentService.getAdherent(1).subscribe({
      next: (data) => {
        this.adherent = data;
        this.dateAffichee = this.formatDate(data.dateValidite);
        this.qrData = `${data.numeroAdherent} - ${data.nom} ${data.prenom}`;
      },
      error: () => {
        this.adherent = {
          id: 1,
          nom: 'Naudin',
          prenom: 'Claire',
          numeroAdherent: 'HM-2026-00142',
          mutuelle: 'Harmonie Mutuelle',
          dateValidite: '2026-12-31',
        };
        this.dateAffichee = '31/12/2026';
        this.qrData = 'HM-2026-00142 - Naudin Claire';
      },
    });
  }

  formatDate(date: any): string {
    if (Array.isArray(date)) {
      // Java renvoie parfois [2026, 12, 31]
      return `${date[2]}/${date[1]}/${date[0]}`;
    }
    if (typeof date === 'string') {
      const [y, m, d] = date.split('-');
      return `${d}/${m}/${y}`;
    }
    return String(date);
  }
}
