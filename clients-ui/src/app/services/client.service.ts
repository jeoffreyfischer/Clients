import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable} from 'rxjs';
import { ClientInfoDTO } from '../models/client-info-dto.interface';
import { ClientDisplayDTO } from '../models/client-display-dto.interface';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private clientsURL = "https://localhost:7229/Client";

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getClients(): Observable<ClientDisplayDTO[]> {
    return this.http.get<ClientDisplayDTO[]>(this.clientsURL, this.httpOptions);
  }

  getClient(id: number): Observable<ClientInfoDTO> {
    return this.http.get<ClientInfoDTO>(`${this.clientsURL}/${id}`, this.httpOptions);
  }

  addClient(client: ClientInfoDTO): Observable<HttpResponse<any>> {
    return this.http.post<HttpResponse<any>>(`${this.clientsURL}/Add`, client, this.httpOptions);
  }

  updateClient(id: number, client: ClientInfoDTO): Observable<HttpResponse<any>> {
    return this.http.put<HttpResponse<any>>(`${this.clientsURL}/Edit/${id}`, client, this.httpOptions);
  }

}
