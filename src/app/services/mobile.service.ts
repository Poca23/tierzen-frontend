import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { Share } from '@capacitor/share';
import { Adherent } from './adherent.service';

@Injectable({ providedIn: 'root' })
export class MobileService {
  // Sauvegarde les infos adhérent en local (hors-ligne)
  async sauvegarder(adherent: Adherent): Promise<void> {
    await Preferences.set({
      key: 'adherent',
      value: JSON.stringify(adherent),
    });
  }

  // Récupère les infos sauvegardées
  async charger(): Promise<Adherent | null> {
    const result = await Preferences.get({ key: 'adherent' });
    return result.value ? JSON.parse(result.value) : null;
  }

  // Partage la carte familiale
  async partager(adherent: Adherent): Promise<void> {
    const texte = `${adherent.prenom} ${adherent.nom} — ${adherent.numeroAdherent} — ${adherent.mutuelle}`;

    // Web Share API native (mobile + HTTPS)
    if (navigator.share) {
      await navigator.share({ title: 'Ma carte TierZen', text: texte });
    } else {
      // Fallback : copie dans le presse-papier
      try {
        await navigator.clipboard.writeText(texte);
        alert(
          '📋 Infos copiées !\n\nNote : le partage natif nécessite HTTPS (disponible en production).',
        );
      } catch {
        alert(
          'ℹ️ Partage natif disponible en production (HTTPS + app mobile).\n\nInfos adhérent :\n' +
            texte,
        );
      }
    }
  }
}
