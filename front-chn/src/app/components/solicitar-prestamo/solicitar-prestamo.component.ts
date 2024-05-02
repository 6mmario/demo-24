import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ClienteService } from 'src/app/services/clientes/cliente.service';
import { PrestamoService } from 'src/app/services/prestamos/prestamo.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogsComponent } from '../dialogs/dialogs.component';

@Component({
  selector: 'app-solicitar-prestamo',
  templateUrl: './solicitar-prestamo.component.html',
  styleUrls: ['./solicitar-prestamo.component.css']
})
export class SolicitarPrestamoComponent {
  numeroIdentificacion!: string;
  cliente = { nombre: '', apellido: '', fechaNacimiento: '', id: null };
  solicitud = {
    clienteId: null,
    montoSolicitado: null,
    plazoDeseado: null,
    estado: 'En proceso',
    detalles: ''
  };

  constructor(private http: HttpClient,
    private clienteService: ClienteService,
    private prestamoService: PrestamoService,
    private dialog: MatDialog  // Inyectar MatDialog aquí
  ) { }

  buscarCliente() {
    this.clienteService.buscarClientePorIdentificacion(this.numeroIdentificacion).subscribe(data => {
      console.table(data);
      this.cliente = data;
      this.solicitud.clienteId = data.clienteID;
    });
  }

  registrarSolicitud() {
    this.prestamoService.registrarSolicitudPrestamo(this.solicitud).subscribe({
      next: (response) => {
        this.dialog.open(DialogsComponent, {
          width: '300px',
          data: { message: 'Tu solicitud de crédito ha sido registrada con éxito.' }
        });
        this.resetForm();
      },
      error: (error) => {
        this.dialog.open(DialogsComponent, {
          width: '300px',
          data: { message: 'Error al registrar la solicitud de crédito.' }
        });
        console.error('Error al registrar la solicitud de crédito', error);
      }
    });
  }

  resetForm() {
    this.numeroIdentificacion = '';
    this.cliente = { nombre: '', apellido: '', fechaNacimiento: '', id: null };
    this.solicitud = {
      clienteId: null,
      montoSolicitado: null,
      plazoDeseado: null,
      estado: 'En proceso',
      detalles: ''
    };
  }
}
