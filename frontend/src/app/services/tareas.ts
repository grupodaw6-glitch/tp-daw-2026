// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';

// @Injectable({
//   providedIn: 'root',
// })
// export class TareasService {
//   private apiUrl = 'http://localhost:3000/api/v1/proyectos';

//   constructor(private http: HttpClient) {}

//   private getHeaders() {
//     const token = localStorage.getItem('token');

//     return {
//       headers: new HttpHeaders({
//         Authorization: `Bearer ${token}`,
//       }),
//     };
//   }

//   create(idProyecto: number, tarea: any) {
//     return this.http.post(`${this.apiUrl}/${idProyecto}/tareas`, tarea, this.getHeaders());
//   }

//   update(idProyecto: number, id: number, tarea: any) {
//     return this.http.put(`${this.apiUrl}/${idProyecto}/tareas/${id}`, tarea, this.getHeaders());
//   }

//   delete(idProyecto: number, id: number) {
//     return this.http.delete(`${this.apiUrl}/${idProyecto}/tareas/${id}`, this.getHeaders());
//   }

// }
import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class TareasService {
  private apiUrl = 'http://localhost:3000/api/v1/proyectos';

  constructor(private http: HttpClient) {}

  private getHeaders() {
    const token = localStorage.getItem('token');

    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    };
  }

  findAll(idProyecto: number) {
    return this.http.get(`${this.apiUrl}/${idProyecto}/tareas`, this.getHeaders());
  }

  create(idProyecto: number, tarea: any) {
    return this.http.post(`${this.apiUrl}/${idProyecto}/tareas`, tarea, this.getHeaders());
  }

  update(idProyecto: number, id: number, tarea: any) {
    return this.http.put(`${this.apiUrl}/${idProyecto}/tareas/${id}`, tarea, this.getHeaders());
  }

  delete(idProyecto: number, id: number) {
    return this.http.delete(`${this.apiUrl}/${idProyecto}/tareas/${id}`, this.getHeaders());
  }
}
