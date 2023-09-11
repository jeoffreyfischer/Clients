import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClientInfoDTO } from '../models/client-info-dto.interface';
import { ClientDisplayDTO } from '../models/client-display-dto.interface';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private clientsURL = "https://localhost:7229/Client";

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient, private router: Router) { }

  getClients(): Observable<ClientDisplayDTO[]> {
    return this.http.get<ClientDisplayDTO[]>(`${this.clientsURL}/GetAll`, this.httpOptions);
  }

  getClient(id: number): Observable<ClientInfoDTO> {
    return this.http.get<ClientInfoDTO>(`${this.clientsURL}/Get/${id}`, this.httpOptions);
  }

  addClient(client: ClientInfoDTO): Observable<HttpResponse<any>> {
    return this.http.post<HttpResponse<any>>(`${this.clientsURL}/Add`, client, this.httpOptions);
  }

  updateClient(id: number, client: ClientInfoDTO): Observable<HttpResponse<any>> {
    return this.http.put<HttpResponse<any>>(`${this.clientsURL}/Edit/${id}`, client, this.httpOptions);
  }

  deleteClient(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<HttpResponse<any>>(`${this.clientsURL}/Delete/${id}`, this.httpOptions);
  }

  searchClients(query: string): Observable<ClientInfoDTO[]> {
    return this.http.get<ClientInfoDTO[]>(`${this.clientsURL}/Search?searchTerm=${query}`, this.httpOptions);
  }

}
