import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { Observable} from 'rxjs';
import { ClientDisplayDTO } from 'src/app/models/client-display-dto.interface';

@Component({
  selector: 'app-clients-list',
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.css']
})
export class ClientsListComponent implements OnInit {

  title = "Clients List";

  constructor(private clientService: ClientService) {}

  clients$: Observable<ClientDisplayDTO[]> = new Observable<ClientDisplayDTO[]>();

  ngOnInit(): void {
    this.clients$ = this.clientService.getClients();
  }

}
