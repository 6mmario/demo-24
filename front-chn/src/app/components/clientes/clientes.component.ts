import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Cliente } from 'src/app/Models/cliente';
import { ClienteService } from 'src/app/services/clientes/cliente.service';
import { Router } from '@angular/router'; // Importa Router

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

  deleteCliente(clienteId: number) {
    // Implementar eliminación aquí
  }

  editCliente(clienteId: number) {
    // Navega al componente de registro de cliente con el ID del cliente como parámetro
    console.log(['/clientes/nuevo', { id: clienteId }])
    this.router.navigate(['/clientes/nuevo', { id: clienteId }]);
  }
}
