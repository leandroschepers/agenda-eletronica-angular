import { HttpClient, HttpClientModule } from "@angular/common/http";
import { Component } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { Router, RouterModule } from "@angular/router";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-agenda',
  standalone: true,
  templateUrl: './agenda.component.html',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
})
export class AgendaComponent {
  agendaForm: FormGroup;
  agenda: any[] = [];

  constructor(private http: HttpClient, private fb: FormBuilder, private router: Router) {
    this.agendaForm = this.fb.group({ title: '', date: '', description: '' });
    this.getAgenda();
  }

  getAgenda() {
    this.http.get('http://localhost:3000/agenda')
      .subscribe((response: any) => this.agenda = response);
  }

  addEvent() {
    this.http.post('http://localhost:3000/agenda', this.agendaForm.value)
      .subscribe(() => {
        this.getAgenda();
        this.agendaForm.reset();
      });
  }
}
