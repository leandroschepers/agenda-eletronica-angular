import { CommonModule } from "@angular/common";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { Component } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { Router, RouterModule } from "@angular/router";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private http: HttpClient, private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({ email: '', password: '' });
  }

  login() {
    this.http.post('https://api-users-gdsb.onrender.com/login', this.loginForm.value)
      .subscribe((response: any) => {
        localStorage.setItem('token', response.token);
        this.router.navigate(['/agenda']);
      });
  }
}