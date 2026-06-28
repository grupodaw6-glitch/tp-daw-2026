import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProyectosService {
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

  findAll() {
    return this.http.get<any[]>(this.apiUrl, this.getHeaders());
  }

  findOne(id: number) {
    return this.http.get(`${this.apiUrl}/${id}`, this.getHeaders());
  }

  create(data: any) {
    return this.http.post(this.apiUrl, data, this.getHeaders());
  }

  update(id: number, data: any) {
    return this.http.put(`${this.apiUrl}/${id}`, data, this.getHeaders());
  }

  delete(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`, this.getHeaders());
  }
}
