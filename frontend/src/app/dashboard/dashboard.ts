// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import jsPDF from 'jspdf';
// import autoTable from 'jspdf-autotable';
// import { ButtonModule } from 'primeng/button';
// import { RouterModule } from '@angular/router';
// import { RouterLink } from '@angular/router';
// import { ProyectosService } from '../services/proyectos';
// @Component({
//   selector: 'app-dashboard',
//   standalone: true,
//   imports: [CommonModule, ButtonModule, RouterModule, RouterLink],
//   templateUrl: './dashboard.html',
//   styleUrl: './dashboard.css',
// })
// export class DashboardComponent implements OnInit {
//   constructor(private proyectosService: ProyectosService) {}
//   proyectos: any[] = [];

//   ngOnInit(): void {
//     this.proyectosService.findAll().subscribe({
//       next: (data: any) => {
//         console.log('PROYECTOS CARGADOS:', data);

//         this.proyectos = data;
//       },

//       error: (err) => {
//         console.error(err);
//       },
//     });
//   }

//   exportarProyectosAPDF() {
//     console.log('PROYECTOS:', this.proyectos);
//     console.log('CANTIDAD:', this.proyectos.length);
//     const doc = new jsPDF();

//     doc.setFontSize(18);
//     doc.setTextColor(40, 40, 40);
//     doc.text('Sistema de gestión de proyectos', 14, 20);

//     doc.setFontSize(12);
//     doc.setTextColor(100, 100, 100);
//     doc.text('Reporte de Gestión de Proyectos', 14, 28);
//     doc.text(`Fecha de emisión: ${new Date().toLocaleDateString()}`, 14, 34);

//     const columnas = ['ID', 'Nombre del Proyecto', 'Estado', 'Cliente'];
//     const filas = this.proyectos.map((p) => [
//       p.id,
//       p.nombre,
//       p.estado,
//       p.cliente ? p.cliente.nombre : 'Interno (Sin Cliente)',
//     ]);

//     autoTable(doc, {
//       startY: 45,
//       head: [columnas],
//       body: filas,
//       theme: 'grid',
//       headStyles: { fillColor: [63, 81, 181] }, // Azul PrimeNG
//       alternateRowStyles: { fillColor: [245, 245, 245] },
//     });

//     doc.save('Reporte_Proyectos.pdf');
//   }
//   logout() {
//     localStorage.removeItem('token');
//     location.href = '/';
//   }
// }


import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { ButtonModule } from 'primeng/button';
import { RouterModule, RouterLink } from '@angular/router';

import { ProyectosService } from '../services/proyectos';
import { ClientesService } from '../services/clientes';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    RouterModule,
    RouterLink
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class DashboardComponent implements OnInit {

  proyectos: any[] = [];

  proyectosTotales = 0;
  proyectosActivos = 0;
  proyectosFinalizados = 0;
  clientesTotales = 0;

  constructor(
    private proyectosService: ProyectosService,
    private clientesService: ClientesService
  ) {}

  ngOnInit(): void {
      console.log('Dashboard iniciado');
    this.cargarEstadisticas();
  }

  cargarEstadisticas(): void {

    this.proyectosService.findAll().subscribe({

      next: (data: any[]) => {

        this.proyectos = data;

        this.proyectosTotales = data.length;

        this.proyectosActivos = data.filter(
          p => p.estado === 'ACTIVO'
        ).length;

        this.proyectosFinalizados = data.filter(
          p => p.estado === 'FINALIZADO'
        ).length;

      },

      error: (err) => {
        console.error(err);
      }

    });

    this.clientesService.findAll().subscribe({

      next: (clientes: any[]) => {

        this.clientesTotales = clientes.length;

      },

      error: (err) => {
        console.error(err);
      }

    });

  }

  exportarProyectosAPDF(): void {

    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text('Sistema de Gestión de Proyectos', 14, 20);

    doc.setFontSize(12);
    doc.text(
      `Fecha: ${new Date().toLocaleDateString()}`,
      14,
      30
    );

    const columnas = [
      'ID',
      'Proyecto',
      'Estado',
      'Cliente'
    ];

    const filas = this.proyectos.map(p => [
      p.id,
      p.nombre,
      p.estado,
      p.cliente ? p.cliente.nombre : 'Interno'
    ]);

    autoTable(doc, {
      startY: 40,
      head: [columnas],
      body: filas,
      theme: 'grid'
    });

    doc.save('Reporte_Proyectos.pdf');

  }

  logout(): void {

    localStorage.removeItem('token');
    location.href = '/';

  }

}

