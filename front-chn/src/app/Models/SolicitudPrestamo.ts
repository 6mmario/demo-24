import { Cliente } from "./cliente";

export interface SolicitudPrestamo {
  solicitudid: number;
  cliente: Cliente; 
  montoSolicitado: number;
  plazoDeseado: number;
  estado: string;
  detalles: string;
  descripcion?: string;
}