import { Component } from '@angular/core';
import { SolicitudPrestamo } from 'src/app/Models/SolicitudPrestamo';
import { Cliente } from 'src/app/Models/cliente';
import { ClienteService } from 'src/app/services/clientes/cliente.service';
import { PrestamoService } from 'src/app/services/prestamos/prestamo.service';
import { MatDialog } from '@angular/material/dialog';
import { ApprovalDialogComponent } from '../approval-dialog/approval-dialog.component';
import { PrestamoAprobadoService } from 'src/app/services/prestamos/prestamo-aprobado.service';
import { PagosModalComponent } from '../pagos-modal/pagos-modal.component';

@Component({
  selector: 'app-prestamos',
  templateUrl: './prestamos.component.html',
  styleUrls: ['./prestamos.component.css']
})
export class PrestamosComponent {
  numeroIdentificacion: string = '';
  cliente?: Cliente;
  solicitudesPendientes: SolicitudPrestamo[] = [];
  displayedColumns: string[] = ['montoSolicitado', 'plazoDeseado', 'estado', 'detalles', 'descripcion', 'acciones'];
  displayedColumnsAprobados: any[] = ['fechaAprobacion', 'montoAprobado', 'plazoMeses', 'plazoEstado', 'acciones']
  dataSourceAprobados: any[] = []
  constructor(private prestamoService: PrestamoService,
    private prestamoAprobadoService: PrestamoAprobadoService,
    private clienteService: ClienteService,
    private dialog: MatDialog
  ) { }

  buscarSolicitudesPendientes() {
    this.cargarPrestamosAprobados(this.numeroIdentificacion)
    // Primero busca el cliente para obtener su ID
    this.clienteService.buscarClientePorIdentificacion(this.numeroIdentificacion)
      .subscribe(cliente => {
        this.cliente = cliente;  // Almacenar la información del cliente
        // Luego busca las solicitudes pendientes usando el ID del cliente
        this.prestamoService.buscarSolicitudesPendientes(cliente.clienteID)
          .subscribe(solicitudes => {
            this.solicitudesPendientes = solicitudes;
          }, error => console.error('Error al buscar solicitudes pendientes', error));
      }, error => console.error('Error al buscar cliente', error));
  }

  openDialog(action: string, solicitud: any): void {
    const dialogRef = this.dialog.open(ApprovalDialogComponent, {
      width: '250px',
      data: { type: action, solicitud: solicitud }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cargarSolicitudes();  // Recarga la lista de solicitudes
      }
    });
  }

  cargarSolicitudes() {
    // Primero busca el cliente para obtener su ID
    this.clienteService.buscarClientePorIdentificacion(this.numeroIdentificacion)
      .subscribe(cliente => {
        this.cliente = cliente;  // Almacenar la información del cliente
        // Luego busca las solicitudes pendientes usando el ID del cliente
        this.prestamoService.buscarSolicitudesPendientes(cliente.clienteID)
          .subscribe(solicitudes => {
            this.solicitudesPendientes = solicitudes;
          }, error => console.error('Error al buscar solicitudes pendientes', error));
      }, error => console.error('Error al buscar cliente', error));
  }

  verDetallesPago(prestamo: any) {
    const dialogRef = this.dialog.open(PagosModalComponent, {
      width: '500px',
      data: { prestamoId: prestamo.prestamoid }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('La modal de pagos se cerró');
    });
  }

  cargarPrestamosAprobados(numeroIdentificacion: string) {
    this.prestamoAprobadoService.buscarPrestamosAprobadosPorIdentificacion(numeroIdentificacion).subscribe(data => {
      console.log('Datos recibidos:', data);
      this.dataSourceAprobados = data;
    }, error => {
      console.error('Error al cargar los préstamos aprobados', error);
    });
  }
  
  


}
