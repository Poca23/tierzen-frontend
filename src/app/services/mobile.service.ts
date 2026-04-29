import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { Share } from '@capacitor/share';
import { Adherent } from './adherent.service';

@Injectable({ providedIn: 'root' })
export class MobileService {
  async sauvegarder(adherent: Adherent): Promise<void> {
    await Preferences.set({
      key: 'adherent',
      value: JSON.stringify(adherent),
    });
  }

  async charger(): Promise<Adherent | null> {
    const result = await Preferences.get({ key: 'adherent' });
    return result.value ? JSON.parse(result.value) : null;
  }

  async partager(adherent: Adherent): Promise<void> {
    const texte = `${adherent.prenom} ${adherent.nom} — ${adherent.numeroAdherent} — ${adherent.mutuelle}`;

    try {
      // Share natif Capacitor
      await Share.share({
        title: 'Ma carte TierZen',
        text: texte,
        dialogTitle: 'Partager ma carte',
      });
    } catch {
      // Fallback : copie dans le presse-papier (desktop)
      try {
        await navigator.clipboard.writeText(texte);
        alert('📋 Infos copiées dans le presse-papier.');
      } catch {
        alert('ℹ️ Infos adhérent :\n' + texte);
      }
    }
  }
}
