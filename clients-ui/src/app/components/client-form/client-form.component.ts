import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ClientInfoDTO } from 'src/app/models/client-info-dto.interface';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.css']
})
export class ClientFormComponent implements OnInit {

  title = "Client Details";
  isAddMode: boolean = false;

  constructor(private clientService: ClientService, private route: ActivatedRoute, private router: Router) {
    this.isAddMode = this.route.snapshot.url.toString().includes('add');
  }

  clientForm = new FormGroup({
    id: new FormControl(0),
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    age: new FormControl(0, [Validators.required]),
    height: new FormControl(0, [Validators.required, Validators.min(0)]),
    isMember: new FormControl('', [Validators.required])
  });

  ngOnInit(): void {
    if (!this.isAddMode) {
      const id = this.route.snapshot.params['id'];
      if (id) {
        this.clientService.getClient(id).subscribe(
          (client) => {
            this.clientForm.patchValue({
              id: client.id,
              name: client.name,
              age: client.age,
              height: client.height,
              isMember: client.isMember
            })
          }
        )
      }
    }
  }

  goToListPage() {
    this.router.navigate(['/clients']);
  }

  deleteClient() {
    console.log(this.route.snapshot.params['id'])
    this.clientService.deleteClient(this.route.snapshot.params['id']);
    this.router.navigate(['/clients']);
  }

  onSubmit() {
    if (this.clientForm.valid) {
      const updatedClient = this.clientForm.value as ClientInfoDTO;
      updatedClient.name = updatedClient.name.trim();
      updatedClient.age = updatedClient.age;
      updatedClient.height = updatedClient.height;
      updatedClient.isMember = updatedClient.isMember;
      if (this.isAddMode) {
        this.clientService.addClient(updatedClient)
          .subscribe(
            () => {
              this.router.navigate(['/clients']);
            },
          );
      }
      else {
        const id = this.route.snapshot.params['id'];
        this.clientService.updateClient(id, updatedClient).subscribe(
          () => {
            this.router.navigate(['/clients']);
          },
        );
      }
    }
  }

}
