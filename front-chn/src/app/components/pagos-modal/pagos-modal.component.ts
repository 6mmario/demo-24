import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PagoService } from 'src/app/services/pagos/pago.service';
import { PrestamoAprobadoService } from 'src/app/services/prestamos/prestamo-aprobado.service';


@Component({
  selector: 'app-pagos-modal',
  templateUrl: './pagos-modal.component.html',
  styleUrls: ['./pagos-modal.component.css']
})
export class PagosModalComponent implements OnInit {
   dataSource = new MatTableDataSource<any>();
  pagos: any[] = [];
  displayedColumns: string[] = ['numeroPago', 'fechaPago', 'monto', 'estado'];
  saldoPendiente!: number;
  cantidadAbonada!: number;

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(
    private dialogRef: MatDialogRef<PagosModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { prestamoId: number },
    private pagosService: PagoService,
    private prestamoAprobadosService: PrestamoAprobadoService
  ) {}

  ngOnInit() {
    this.cargarPagos();
    this.obtenerSaldo();
  }
  
  cargarPagos() {
    if (this.data.prestamoId) {
      this.pagosService.obtenerPagosPorPrestamoId(this.data.prestamoId).subscribe(pagos => {
        this.dataSource.data = pagos;
        if (this.paginator) {
          this.dataSource.paginator = this.paginator;
        } else {
          console.error('Paginator no está disponible.');
        }
      });
    }
  }

  obtenerSaldo() {
    this.prestamoAprobadosService.obtenerSaldoPendiente(this.data.prestamoId).subscribe(saldo => {
      this.saldoPendiente = saldo.cantidadPendiente;
      this.cantidadAbonada = saldo.cantidadAbonada;
    });
  }

  cerrar() {
    this.dialogRef.close();
  }
}
