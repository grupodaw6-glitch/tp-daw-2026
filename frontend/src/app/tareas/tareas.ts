import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TareasService } from '../services/tareas';
import { ProyectosService } from '../services/proyectos';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-tareas',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './tareas.html',
  styleUrl: './tareas.css',
})
export class TareasComponent implements OnInit {
  busquedaTarea: string = '';

  tareas: any[] = [];

  tareasFiltradas: any[] = [];

  idProyecto = 0;

  mostrarFormulario = false;

  editando = false;

  idEditando = 0;

  nuevaTarea = {
    descripcion: '',
  };

  constructor(
    private tareasService: TareasService,
    private proyectosService: ProyectosService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}
  ngOnInit(): void {
    console.log(this.route.snapshot.params);

    this.idProyecto = Number(this.route.snapshot.params['idProyecto']);

    console.log('ESTE ES EL ID DEL PROYECTO:', this.idProyecto);

    this.cargarTareas();
  }
  logout(): void {
    localStorage.removeItem('token');

    this.router.navigate(['/']);
  }

  cargarTareas(): void {
    console.log('Proyecto:', this.idProyecto);

    this.proyectosService.findOne(this.idProyecto).subscribe({
      next: (data: any) => {
        console.log('RESPUESTA PROYECTO', data);

        this.tareas = data.tareas || [];

        console.log('TAREAS', this.tareas);

        this.tareasFiltradas = this.tareas;
      },

      error: (err) => {
        console.error(err);
      },
    });
  }

  filtrarTareas(): void {
    const texto = this.busquedaTarea.toLowerCase();

    this.tareasFiltradas = this.tareas.filter(
      (tarea) =>
        tarea.descripcion.toLowerCase().includes(texto) ||
        tarea.estado.toLowerCase().includes(texto),
    );
  }

  mostrarFormularioNuevo(): void {
    this.editando = false;

    this.nuevaTarea = {
      descripcion: '',
    };

    this.mostrarFormulario = true;
  }

  editarTarea(id: number): void {
    const tarea = this.tareas.find((t) => t.id === id);

    if (!tarea) {
      return;
    }

    this.editando = true;

    this.idEditando = id;

    this.nuevaTarea = {
      descripcion: tarea.descripcion,
    };

    this.mostrarFormulario = true;
  }

  guardarTarea(): void {
    if (!this.nuevaTarea.descripcion) {
      alert('Ingrese una tarea buscar descripción');

      return;
    }

    if (this.editando) {
      this.tareasService.update(this.idProyecto, this.idEditando, this.nuevaTarea).subscribe({
        next: () => {
          alert('Tarea actualizada');

          this.cargarTareas();

          this.mostrarFormulario = false;
        },

        error: (err: any) => {
          console.error(err);

          alert('Error al actualizar');
        },
      });
    } else {
      this.tareasService.create(this.idProyecto, this.nuevaTarea).subscribe({
        next: () => {
          alert('Tarea creada');

          this.cargarTareas();

          this.mostrarFormulario = false;
        },

        error: (err: any) => {
          console.error(err);

          alert('No se pudo crear, vuelva a intentar');
        },
      });
    }
  }

  eliminarTarea(id: number): void {
    if (!confirm('¿Quitar tarea?')) {
      return;
    }

    this.tareasService.delete(this.idProyecto, id).subscribe({
      next: () => {
        alert('Tarea fue dada de baja');

        this.cargarTareas();
      },

      error: (err: any) => {
        console.error(err);

        alert('Error al eliminar');
      },
    });
  }
}
