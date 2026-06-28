import { Router } from '@angular/router';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProyectosService } from '../services/proyectos';
import { TareasService } from '../services/tareas';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-proyectos',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './proyectos.html',
  styleUrl: './proyectos.css',
})
export class ProyectosComponent implements OnInit {
  
  busquedaProyecto: string = '';

  proyectos: any[] = [];

  proyectosFiltrados: any[] = [];

  proyectoSeleccionado: any = null;

  mostrarFormulario = false;

  editando = false;

  idEditando = 0;

  nuevoProyecto = {
    nombre: '',
    idCliente: null as number | null,
  };

  constructor(
    private proyectosService: ProyectosService,
    private router: Router,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.cargarProyectos();
  }

  logout(): void {
    localStorage.removeItem('token');

    this.router.navigate(['/']);
  }

  cargarProyectos(): void {
    this.proyectosService.findAll().subscribe((data) => {
      this.proyectos = data;
      this.proyectosFiltrados = data;
      this.cdr.detectChanges();
    });
  }

  filtrarProyectos(): void {
    const texto = this.busquedaProyecto.toLowerCase();

    this.proyectosFiltrados = this.proyectos.filter(
      (proyecto) =>
        proyecto.nombre?.toLowerCase().includes(texto) ||
        proyecto.estado?.toLowerCase().includes(texto) ||
        proyecto.cliente?.nombre?.toLowerCase().includes(texto),
    );
  }

  verDetalle(id: number): void {
    this.proyectosService.findOne(id).subscribe((data) => {
      this.proyectoSeleccionado = data;
    });
  }

  mostrarFormularioNuevo(): void {
    this.editando = false;

    this.idEditando = 0;

    this.nuevoProyecto = {
      nombre: '',
      idCliente: null,
    };

    this.mostrarFormulario = true;
  }

  editarProyecto(id: number): void {
    const proyecto = this.proyectos.find((p) => p.id === id);

    if (!proyecto) {
      return;
    }

    this.editando = true;

    this.idEditando = id;

    this.nuevoProyecto = {
      nombre: proyecto.nombre,
      idCliente: proyecto.idCliente ?? null,
    };

    this.mostrarFormulario = true;
  }

  abrirTareas(idProyecto: number): void {
    console.log('ID RECIBIDO:', idProyecto);

    this.router.navigate(['/proyectos', idProyecto, 'tareas']);
  }

  guardarProyecto(): void {
    if (!this.nuevoProyecto.nombre) {
      alert('Debe ingresar un nombre');

      return;
    }

    if (this.editando) {
      this.proyectosService.update(this.idEditando, this.nuevoProyecto).subscribe({
        next: () => {
          alert('Proyecto actualizado');

          this.cargarProyectos();

          this.mostrarFormulario = false;
        },
        error: (err: any) => {
          console.log(err);

          alert(JSON.stringify(err.error));
        },
      });
    } else {
      this.proyectosService.create(this.nuevoProyecto).subscribe({
        next: () => {
          alert('Proyecto creado');

          this.cargarProyectos();

          this.mostrarFormulario = false;
        },

        error: (err: any) => {
          console.error(err);

          alert(JSON.stringify(err.error));
        },
      });
    }
  }

  eliminarProyecto(id: number): void {
    if (!confirm('¿ELIMINAR PROYECTO?')) {
      return;
    }

    this.proyectosService.delete(id).subscribe({
      next: () => {
        alert('Proyecto eliminado');

        this.cargarProyectos();
      },

      error: (err: any) => {
        console.error(err);

        alert('Error al eliminar proyecto');
      },
    });
  }
}
