import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientsListComponent } from './components/clients-list/clients-list.component';
import { ClientFormComponent } from './components/client-form/client-form.component';

const routes: Routes = [
  { path: '', redirectTo: '/clients/add', pathMatch: 'full' },
  { path: 'clients', component: ClientsListComponent },
  { path: 'clients/add', component: ClientFormComponent },
  { path: 'clients/edit/:id', component: ClientFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
