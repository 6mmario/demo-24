import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { RegistrarClientesComponent } from './components/registrar-clientes/registrar-clientes.component';
import { PrestamosComponent } from './components/prestamos/prestamos.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MenuComponent } from './components/menu/menu.component';
import { MatTableModule } from '@angular/material/table';  // Importa MatTableModule
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { SolicitarPrestamoComponent } from './components/solicitar-prestamo/solicitar-prestamo.component';
import { DialogsComponent } from './components/dialogs/dialogs.component';
import { ApprovalDialogComponent } from './components/approval-dialog/approval-dialog.component';
import { PagosModalComponent } from './components/pagos-modal/pagos-modal.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    ClientesComponent,
    RegistrarClientesComponent,
    PrestamosComponent,
    MenuComponent,
    SolicitarPrestamoComponent,
    DialogsComponent,
    ApprovalDialogComponent,
    PagosModalComponent,
    ConfirmDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatToolbarModule,
    MatMenuModule,
    MatTableModule,
    MatDialogModule,
    MatIconModule,
    MatPaginatorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
