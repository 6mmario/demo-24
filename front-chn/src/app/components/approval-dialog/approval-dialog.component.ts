import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { PrestamoService } from 'src/app/services/prestamos/prestamo.service';

@Component({
  selector: 'app-approval-dialog',
  templateUrl: './approval-dialog.component.html'
})
export class ApprovalDialogComponent {
  descripcion: string = '';
  montoAprobado?: number;
  plazoMeses?: number;


  constructor(
    public dialogRef: MatDialogRef<ApprovalDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { type: string, solicitud: any },
    private http: HttpClient,
    private prestamoService: PrestamoService
  ) { }

  enviarDecision() {
    this.prestamoService.actualizarSolicitud(
      this.data.solicitud.solicitudid,
      this.data.type,
      this.descripcion,
      this.montoAprobado,
      this.plazoMeses
    ).subscribe(() => {
      this.dialogRef.close(true); 
    });
  }
}
