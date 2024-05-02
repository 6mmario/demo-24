import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrarClientesComponent } from './components/registrar-clientes/registrar-clientes.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { SolicitarPrestamoComponent } from './components/solicitar-prestamo/solicitar-prestamo.component';
import { PrestamosComponent } from './components/prestamos/prestamos.component';

const routes: Routes = [
  { path: 'clientes/nuevo', component: RegistrarClientesComponent },
  { path: 'clientes/nuevo/:id', component: RegistrarClientesComponent }, // Ruta para editar
  { path: 'clientes/listar', component: ClientesComponent},
  { path: 'prestamo/solicitar-credito', component: SolicitarPrestamoComponent },
  { path: 'prestamo/solicitar-credito/:id', component: SolicitarPrestamoComponent },
  { path: 'prestamo/listar', component: PrestamosComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
