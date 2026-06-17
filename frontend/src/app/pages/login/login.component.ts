import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  nombre = '';
  clave = '';

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  login() {
    this.authService
      .login({
        nombre: this.nombre,
        clave: this.clave,
      })
      .subscribe({
        next: (resp: any) => {
          localStorage.setItem('token', resp.access_token);

          this.router.navigate(['/dashboard']);
        },

        error: (err) => {
          alert(err.error.message);
        },
      });
  }
}
