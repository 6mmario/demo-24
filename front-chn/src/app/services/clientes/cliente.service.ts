import { Injectable } from '@angular/core';
import { Cliente } from 'src/app/Models/cliente';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/app/environments/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private apiUrl = environment.apiUrl + '/clientes';

  constructor(private http: HttpClient) { }

  addCliente(cliente: Cliente): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    // Construyendo la URL con los datos del cliente
    const queryParams = `?nombre=${encodeURIComponent(cliente.nombre)}&apellido=${encodeURIComponent(cliente.apellido)}&numeroIdentificacion=${encodeURIComponent(cliente.numeroIdentificacion)}&fechaNacimiento=${cliente.fechaNacimiento.toISOString().split('T')[0]}&direccion=${encodeURIComponent(cliente.direccion)}&correoElectronico=${encodeURIComponent(cliente.correoElectronico)}&telefono=${encodeURIComponent(cliente.telefono)}`;

    return this.http.post(`${this.apiUrl}${queryParams}`, {}, { headers: headers });
  }

  obtenerClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.apiUrl);
  }

  getClienteById(clienteId: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.apiUrl}/${clienteId}`);
  }

  updateCliente(clienteId: number, cliente: Cliente): Observable<any> {
    return this.http.put(`${this.apiUrl}/${clienteId}`, cliente, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  buscarClientePorIdentificacion(numeroIdentificacion: string): Observable<any> {
    const url = `${this.apiUrl}/buscar?numeroIdentificacion=${numeroIdentificacion}`;
    return this.http.get<any>(url);
  }
}
