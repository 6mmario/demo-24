import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrarClientesComponent } from './components/registrar-clientes/registrar-clientes.component';
import { ClientesComponent } from './components/clientes/clientes.component';

const routes: Routes = [
  { path: 'clientes/nuevo', component: RegistrarClientesComponent },
  { path: 'clientes/nuevo/:id', component: RegistrarClientesComponent }, // Ruta para editar
  { path: 'clientes/listar', component: ClientesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
