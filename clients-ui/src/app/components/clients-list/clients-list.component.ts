import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { Observable} from 'rxjs';
import { ClientDisplayDTO } from 'src/app/models/client-display-dto.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clients-list',
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.css']
})
export class ClientsListComponent implements OnInit {

  constructor(private clientService: ClientService, private router: Router) {}

  clients$: Observable<ClientDisplayDTO[]> = new Observable<ClientDisplayDTO[]>();

  ngOnInit(): void {
    this.clients$ = this.clientService.getClients();
  }

  goToAddPage() {
    this.router.navigate(['/clients/add']);
  }

  goToClient(clientId: number) {
    this.router.navigate(['/clients/edit', clientId]);
}

}
