import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component'; // Importando o NavbarComponent

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule, NavbarComponent], // Adicionando o NavbarComponent
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'My Angular App';
  registerForm: FormGroup;
  loginForm: FormGroup;
  agendaForm: FormGroup;
  agenda: any[] = [];
  isAuthenticated = false;

  constructor(private http: HttpClient, private fb: FormBuilder, private router: Router) {
    this.registerForm = this.fb.group({
      name: '',
      email: '',
      password: '',
      role: 'user'
    });

    this.loginForm = this.fb.group({
      email: '',
      password: ''
    });

    this.agendaForm = this.fb.group({
      title: '',
      date: '',
      description: ''
    });
  }

  register() {
    this.http.post('https://api-users-gdsb.onrender.com/register', this.registerForm.value)
      .subscribe(response => {
        console.log('Usuário cadastrado', response);
      });
  }

  login() {
    this.http.post('https://api-users-gdsb.onrender.com/login', this.loginForm.value)
      .subscribe((response: any) => {
        console.log('Usuário logado', response);
        localStorage.setItem('token', response.token);
        this.isAuthenticated = true;
        this.router.navigate(['/agenda']);
      });
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  getAgenda() {
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']);
      return;
    }

    this.http.get('http://localhost:3000/agenda')
      .subscribe((response: any) => {
        this.agenda = response;
      });
  }

  addEvent() {
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']);
      return;
    }
    
    this.http.post('http://localhost:3000/agenda', this.agendaForm.value)
      .subscribe(() => {
        this.getAgenda();
        this.agendaForm.reset();
      });
  }
}
