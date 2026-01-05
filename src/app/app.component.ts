import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

import { ClienteService } from './services/cliente.service';
import { Cliente } from './models/cliente';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule],
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
    dataCriacao: ''
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
      dataCriacao: ''
    }
   }

  title = 'rici-crud';
}
