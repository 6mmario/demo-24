import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Prestamo } from 'src/app/Models/prestamo';
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PrestamoAprobadoService {

  private apiUrl = environment.apiUrl+'/prestamosAprobados';

  constructor(private http: HttpClient) { }

  buscarPrestamosAprobadosPorIdentificacion(numeroIdentificacion: string): Observable<Prestamo[]> {
    return this.http.get<Prestamo[]>(`${this.apiUrl}/buscarPorIdentificacion?numeroIdentificacion=${numeroIdentificacion}`)
      .pipe(
        map(data => data.map(item => new Prestamo(item.prestamoid, item.solicitudPrestamo, new Date(item.fechaAprobacion), item.montoAprobado, item.plazoMeses, item.estadoPago)))
      );
  }

  obtenerSaldoPendiente(prestamoId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/saldo-pendiente/${prestamoId}`);
  }
}
