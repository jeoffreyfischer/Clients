import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { Observable, debounceTime, distinctUntilChanged, startWith, switchMap } from 'rxjs';
import { ClientDisplayDTO } from 'src/app/models/client-display-dto.interface';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-clients-list',
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.css']
})
export class ClientsListComponent implements OnInit {

  filteredClients$: Observable<ClientDisplayDTO[]> = new Observable<ClientDisplayDTO[]>();
  searchQueryControl: FormControl;

  constructor(private clientService: ClientService, private router: Router) {
    this.searchQueryControl = new FormControl('');
  }

  ngOnInit(): void {
    this.filteredClients$ = this.searchQueryControl.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        startWith(this.searchQueryControl.value),
        switchMap(searchText => {
          if (!searchText || searchText.trim() === '') {
            return this.clientService.getClients();
          }
          else {
            return this.clientService.searchClients(searchText);
          }
        })
      )
  }

  goToAddPage() {
    this.router.navigate(['/clients/add']);
  }

  goToClient(clientId: number) {
    this.router.navigate(['/clients/edit', clientId]);
  }

}
