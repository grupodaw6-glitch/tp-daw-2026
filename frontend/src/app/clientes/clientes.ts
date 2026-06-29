import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClientesService } from '../services/clientes';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './clientes.html',
  styleUrl: './clientes.css',
})
export class ClientesComponent implements OnInit {
  busquedaCliente: string = '';
  clientes: any[] = [];
  clientesFiltrados: any[] = [];
  mostrarFormulario = false;

  editando = false;

  idEditando = 0;

  nuevoCliente = {
    nombre: '',
    telefono: '',
    mail: '',
  };

  constructor(
    private clientesService: ClientesService,
    private router: Router,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.cargarClientes();
  }

  logout(): void {
    localStorage.removeItem('token');

    this.router.navigate(['/']);
  }
  cargarClientes(): void {
    this.clientesService.findAll().subscribe((data: any) => {
      this.clientes = data;
      this.clientesFiltrados = data;
      this.cdr.detectChanges();
    });
  }

  filtrarClientes(): void {
    const texto = this.busquedaCliente.toLowerCase();
    this.clientesFiltrados = this.clientes.filter(
      (cliente) =>
        cliente.nombre.toLowerCase().includes(texto) ||
        cliente.estado.toLowerCase().includes(texto),
    );
  }
  mostrarFormularioNuevo(): void {
    this.editando = false;

    this.idEditando = 0;

    this.nuevoCliente = {
      nombre: '',
      telefono: '',
      mail: '',
    };

    this.mostrarFormulario = true;
  }

  editarCliente(id: number): void {
    const cliente = this.clientes.find((c) => c.id === id);

    if (!cliente) {
      return;
    }

    this.editando = true;

    this.idEditando = id;

    this.nuevoCliente = {
      nombre: cliente.nombre,
      telefono: cliente.telefono || '',
      mail: cliente.mail || '',
    };

    this.mostrarFormulario = true;
  }

  guardarCliente(): void {
    if (!this.nuevoCliente.nombre) {
      alert('Debe ingresar un nombre');

      return;
    }

    if (this.editando) {
      this.clientesService.update(this.idEditando, this.nuevoCliente).subscribe({
        next: () => {
          alert('Cliente actualizado');

          this.cargarClientes();

          this.mostrarFormulario = false;
        },

        error: (err: any) => {
          console.error(err);

          alert('Error al actualizar');
        },
      });
    } else {
      this.clientesService.create(this.nuevoCliente).subscribe({
        next: () => {
          alert('Cliente creado');

          this.cargarClientes();

          this.mostrarFormulario = false;
        },

        error: (err: any) => {
          console.error(err);

          alert('No se pudo crear cliente');
        },
      });
    }
  }

  darBaja(id: number): void {
    alert('Dar de baja cliente ' + id);
  }
}
