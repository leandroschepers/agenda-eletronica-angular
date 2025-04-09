import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private http: HttpClient, private fb: FormBuilder, private router: Router) {
    this.registerForm = this.fb.group({ name: '', email: '', password: '', role: 'user' });
  }

  register() {
    this.http.post('https://api-users-gdsb.onrender.com/register', this.registerForm.value)
      .subscribe(() => this.router.navigate(['/login']));
  }
}
