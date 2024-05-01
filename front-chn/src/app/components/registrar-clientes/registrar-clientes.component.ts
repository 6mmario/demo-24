import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ClienteService } from 'src/app/services/clientes/cliente.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/Models/cliente';

@Component({
  selector: 'app-registrar-clientes',
  templateUrl: './registrar-clientes.component.html',
  styleUrls: ['./registrar-clientes.component.css']
})
export class RegistrarClientesComponent implements OnInit {
  clienteForm!: FormGroup;
  submitted = false;
  isEditMode = false;
  currentClienteId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private clienteService: ClienteService,
    private route: ActivatedRoute,
    private router: Router  // Inyecta el Router aquí
  ) { }

  ngOnInit(): void {
    this.clienteForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      identificacion: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      direccion: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      telefono: ['', Validators.required]
    });

    // Capturar el ID del cliente de la ruta si está disponible
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.currentClienteId = Number(id);
        this.isEditMode = true;
        this.loadClienteData(this.currentClienteId);
      }
    });
  }

  loadClienteData(clienteId: number) {
    this.clienteService.getClienteById(clienteId).subscribe({
        next: (cliente) => {
          console.table(cliente)
            this.clienteForm.patchValue({
                nombre: cliente.nombre,
                apellido: cliente.apellido,
                identificacion: cliente.numeroIdentificacion,
                fechaNacimiento: new Date(cliente.fechaNacimiento).toISOString().substring(0, 10), // Asegúrate de convertir las fechas correctamente
                direccion: cliente.direccion,
                correo: cliente.correoElectronico,
                telefono: cliente.telefono
            });
        },
        error: (error) => console.error('Error al cargar los datos del cliente', error)
    });
}

  onSubmit(): void {
    const id:number = 0;
    if (this.clienteForm.valid) {
      const clienteData = new Cliente(
        id,
        this.clienteForm.value.nombre,
        this.clienteForm.value.apellido,
        this.clienteForm.value.identificacion,
        new Date(this.clienteForm.value.fechaNacimiento),
        this.clienteForm.value.direccion,
        this.clienteForm.value.correo,
        this.clienteForm.value.telefono
      );

      if (this.isEditMode && this.currentClienteId) {
        this.clienteService.updateCliente(this.currentClienteId, clienteData).subscribe({
          next: (response) => {
            console.log('Cliente actualizado con éxito', response);
            alert('Cliente actualizado con éxito!');
            this.clienteForm.reset();
            this.submitted = true;
          },
          error: (error) => console.error('Error al actualizar el cliente', error)
        });
      } else {
        this.clienteService.addCliente(clienteData).subscribe({
          next: (response) => {
            console.log('Cliente creado con éxito', response);
            alert('Cliente creado con éxito!');
            this.clienteForm.reset();
            this.submitted = false;
          },
          error: (error) => console.error('Error al crear el cliente', error)
        });
      }
    }
  }

  nuevoCliente(): void {
    this.submitted = false;
    this.clienteForm.reset();
    this.isEditMode = false;
    this.currentClienteId = null;
    this.router.navigate(['/clientes/nuevo']); // También limpia la URL cuando inicias un nuevo cliente
  
  }
}
