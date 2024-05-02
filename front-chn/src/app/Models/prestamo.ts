import { SolicitudPrestamo } from "./SolicitudPrestamo";


export class Prestamo {
    prestamoid: number;
    solicitudPrestamo: SolicitudPrestamo;
    fechaAprobacion: Date;
    montoAprobado: number;
    plazoMeses: number;
    estadoPago: string;

    constructor(prestamoid: number, solicitudPrestamo: SolicitudPrestamo, fechaAprobacion: Date, montoAprobado: number, plazoMeses: number, estadoPago: string) {
        this.prestamoid = prestamoid;
        this.solicitudPrestamo = solicitudPrestamo;
        this.fechaAprobacion = fechaAprobacion;
        this.montoAprobado = montoAprobado;
        this.plazoMeses = plazoMeses;
        this.estadoPago = estadoPago;
    }
}
