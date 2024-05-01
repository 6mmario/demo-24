// src/app/models/cliente.ts

export class Cliente {
    constructor(
      public clienteID: number,
      public nombre: string,
      public apellido: string,
      public numeroIdentificacion: string,
      public fechaNacimiento: Date,
      public direccion: string,
      public correoElectronico: string,
      public telefono: string
    ) {}
  }
  