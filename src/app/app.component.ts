import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import { ClienteService } from './services/cliente.service';
import { Cliente } from './models/cliente';
import { Observable } from 'rxjs';

// Angular 12+ 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Angular Material
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBar, MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatRippleModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';

// Componentes do projeto
import { NavComponent } from './components/nav/nav.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
            RouterOutlet, 
            MatTableModule,
            MatButtonModule,
            MatBadgeModule,
            MatCardModule,
            MatCheckboxModule,
            MatDatepickerModule,
            MatDialogModule,
            MatDividerModule,
            MatExpansionModule,
            MatFormFieldModule,
            MatIconModule,
            MatInputModule,
            MatListModule,
            MatMenuModule,
            MatPaginatorModule,
            MatProgressBarModule,
            MatProgressBar,
            MatProgressSpinnerModule,
            MatRadioModule,
            MatRippleModule,
            MatSelectModule,
            MatSidenavModule,
            MatSlideToggleModule,
            MatSliderModule,
            MatSnackBarModule,
            MatTabsModule,
            MatToolbarModule,
            FormsModule,
            ReactiveFormsModule,
            NavComponent
           ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  clienteService = inject(ClienteService);

  // Lista de Clientes (Observable)
  clientes$: Observable<Cliente[]> = this.clienteService.getClientes();

  // Objeto para formulário
  clienteAtual: Cliente = { 
    nome: '',
    cpf: '',
    email: '',
    telefone: '',
    dataCriacao: '',
    observacoes: '',
    status: 'ativo'
   };
   editando = false; // Controle de estado - Create or Update

   salvar() {
    if (this.editando) {
      this.clienteService.updateCliente(this.clienteAtual)
      .then(() => this.limparForm())
      .catch(err => console.error(err));
    }
    else {
      this.clienteService.addCliente(this.clienteAtual)
      .then(() => this.limparForm())
      .catch(err => console.error(err));
    }
   }

   editar(cliente: Cliente) {
    this.clienteAtual = { ...cliente };
    this.editando = true;
   }

   deletar(id: string) {
    this.clienteService.deleteCliente(id);
   }

   limparForm() {
    this.clienteAtual = { 
      nome: '',
      cpf: '',
      email: '',
      telefone: '',
      dataCriacao: '',
      observacoes: '',
      status: 'ativo'
    }
   }

  title = 'rici-crud';
}
