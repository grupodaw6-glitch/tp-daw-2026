import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TareasComponent } from './tareas/tareas';
import { ProyectosComponent } from './proyectos/proyectos';
import { ClientesComponent } from './clientes/clientes';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
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
    path: 'tareas',
    component: TareasComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
