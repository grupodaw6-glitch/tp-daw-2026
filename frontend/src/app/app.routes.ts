import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { ProyectosComponent } from './proyectos/proyectos';
import { ClientesComponent } from './clientes/clientes';
import { TareasComponent } from './tareas/tareas';
import { DashboardComponent } from './dashboard/dashboard';

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'proyectos',
    component: ProyectosComponent,
  },
  {
    path: 'clientes',
    component: ClientesComponent,
  },
  {
    path: 'proyectos/:idProyecto/tareas',
    component: TareasComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
];
