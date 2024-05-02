import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Cliente } from 'src/app/Models/cliente';
import { ClienteService } from 'src/app/services/clientes/cliente.service';
import { Router } from '@angular/router'; // Importa Router
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {
  dataSource: MatTableDataSource<Cliente>;
  displayedColumns: string[] = ['nombre', 'apellido', 'telefono', 'acciones'];

  @ViewChild('dialogRef', { static: false }) dialogRef?: TemplateRef<any>;

  constructor(
    private clienteService: ClienteService, 
    private dialog: MatDialog,
    private router: Router // Inyectar el Router aquí
  ) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit() {
    this.cargarClientes();
  }

  cargarClientes() {
    this.clienteService.obtenerClientes().subscribe(clientes => {
      console.table(clientes);
      this.dataSource.data = clientes;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog(cliente: Cliente) {
    if (this.dialogRef) {
      this.dialog.open(this.dialogRef, {
        data: cliente
      });
    }
  }

  closeDialog() {
    this.dialog.closeAll();
  }

  openConfirmDialog(clienteId: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      data: '¿Está seguro que quiere eliminar este registro?'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteCliente(clienteId);
      }
    });
  }

  deleteCliente(clienteId: number) {
    this.clienteService.deleteCliente(clienteId).subscribe({
      next: (res) => {
        console.log('Cliente eliminado con éxito', res);
        this.cargarClientes(); // Recargar la lista de clientes
      },
      error: (err) => console.error('Error al eliminar cliente', err)
    });
  }

  editCliente(clienteId: number) {
    console.log(['/clientes/nuevo', { id: clienteId }])
    this.router.navigate(['/clientes/nuevo', { id: clienteId }]);
  }

  solicitarCredito(clienteId: number) {
    // Asumiendo que tienes una ruta configurada para solicitar crédito
    this.router.navigate(['/solicitar-credito', { id: clienteId }]);
}
}
