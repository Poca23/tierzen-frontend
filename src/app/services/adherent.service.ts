import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Adherent {
  id: number;
  nom: string;
  prenom: string;
  numeroAdherent: string;
  mutuelle: string;
  dateValidite: any;
}

@Injectable({ providedIn: 'root' })
export class AdherentService {
  private apiUrl = 'http://[2001:bc8:711:447f:dc00:1ff:fe0a:9edb]:8080/api/adherent';

  constructor(private http: HttpClient) {}

  getAdherent(id: number): Observable<Adherent> {
    return this.http.get<Adherent>(`${this.apiUrl}/${id}`);
  }
}
