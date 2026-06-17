// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';

// @Injectable({
//   providedIn: 'root'
// })
// export class ClientesService {

//   private apiUrl = 'http://localhost:3000/api/clientes';

//   constructor(private http: HttpClient) {}

//   findAll() {
//     return this.http.get<any[]>(this.apiUrl);
//   }
// }
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ClientesService {
  private apiUrl = 'http://localhost:3000/api/v1/clientes';

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

  create(cliente: any) {
    return this.http.post(this.apiUrl, cliente, this.getHeaders());
  }

  update(id: number, cliente: any) {
    return this.http.patch(`${this.apiUrl}/${id}`, cliente, this.getHeaders());
  }
}