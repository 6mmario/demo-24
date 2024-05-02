import { Prestamo } from "./prestamo";

export interface Pagos {
    pagoid: number;
    prestamoAprobado: Prestamo;
    fechaPago: number;
    montoPagado: number;
    estado: string;
    numeroPago: string;
  }