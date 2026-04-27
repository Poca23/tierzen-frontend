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
    try {
      await Share.share({
        title: 'Ma carte TierZen',
        text: `${adherent.prenom} ${adherent.nom} — ${adherent.numeroAdherent}`,
        dialogTitle: 'Partager ma carte',
      });
    } catch {
      console.info('Partage non disponible sur ce navigateur — fonctionnel sur mobile');
    }
  }
}
