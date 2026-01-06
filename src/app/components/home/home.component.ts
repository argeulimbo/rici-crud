import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// Angular Material
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  dashboardData = [
    { title: 'Clientes cadastrados', value: 12, icon: 'assignment_late', color: 'warn' },
    { title: 'Em Andamento', value: 5, icon: 'pending_actions', color: 'accent' },
    { title: 'Encerrados', value: 45, icon: 'assignment_turned_in', color: 'primary' },
    { title: 'Total Clientes', value: 8, icon: 'group', color: 'primary' }
  ];

}
