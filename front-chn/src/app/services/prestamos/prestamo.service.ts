import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PrestamoService {

  private apiUrl = environment.apiUrl + '/solicitudes-prestamo';

  constructor(private http: HttpClient) { }

  registrarSolicitudPrestamo(solicitud: any): Observable<any> {

    console.table(solicitud)
    return this.http.post(this.apiUrl, solicitud);
  }

  buscarSolicitudesPendientes(clienteId: number): Observable<any[]> {
    const url = `${this.apiUrl}/pendientes?clienteId=${clienteId}`;
    return this.http.get<any[]>(url);
  }

  actualizarSolicitud(id: number, estado: string, descripcion: string, montoAprobado?: number, plazoMeses?: number): Observable<any> {
    if(estado === 'rechazar') {
      estado = 'Rechazado'
    }

    if(estado === 'aprobar') {
      estado = 'Aprobado'
    }
    
    let url = `${this.apiUrl}/solicitudes/actualizar?id=${id}&estado=${estado}&descripcion=${descripcion}`;
    if (estado === 'Aprobado') {
      url += `&montoAprobado=${montoAprobado}&plazoMeses=${plazoMeses}`;
    }
    return this.http.post(url, {});
  }

}
