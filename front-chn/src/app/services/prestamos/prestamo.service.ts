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
}
