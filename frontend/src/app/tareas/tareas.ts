import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TareasService } from '../services/tareas';

@Component({
  selector: 'app-tareas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tareas.html',
  styleUrl: './tareas.css',
})
export class TareasComponent implements OnInit {
  busquedaTarea: string = '';
  tareas: any[] = [];
  tareasFiltradas: any[] = [];

  constructor(
    private tareasService: TareasService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    const idProyecto = this.route.snapshot.params['idProyecto'];
    this.cargarTareas(idProyecto);
  }

  cargarTareas(idProyecto: number): void {
    this.tareasService.findAll(idProyecto).subscribe((data: any) => {
      this.tareas = data;

      this.tareasFiltradas = data;
    });
  }

  filtrarTareas(): void {
    const texto = this.busquedaTarea.toLowerCase();
    this.tareasFiltradas = this.tareas.filter(
      (tarea) =>
        tarea.descripcion.toLowerCase().includes(texto) ||
        tarea.estado.toLowerCase().includes(texto) ||
        tarea.proyecto?.nombre?.toLowerCase().includes(texto),
    );
  }
}
