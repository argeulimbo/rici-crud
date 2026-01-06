import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { ClienteService } from '../../../services/cliente.service';
import { Cliente } from '../../../models/cliente';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cliente-create',
  standalone: true,
  imports: [
    MatCheckboxModule,
    MatCardModule,
    MatRadioModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatDividerModule,
    MatButtonModule,
    ReactiveFormsModule,
    NgxMaskDirective
],
  templateUrl: './cliente-create.component.html',
  styleUrl: './cliente-create.component.css'
})
export class ClienteCreateComponent {

  cliente: Cliente = {
    id:           '',
    nome:         '',
    cpf:          '',
    email:        '',
    telefone:     '',
    dataCriacao:  ''
  }

  nome: FormControl = new FormControl(null, Validators.minLength(3));
  cpf: FormControl = new FormControl(null, Validators.required);
  email: FormControl = new FormControl(null, Validators.email);
  telefone: FormControl = new FormControl(null, Validators.required);
  
  constructor(private router: Router,
              private service: ClienteService,
              private toast: ToastrService
  ) { }

  cancelar() {
    this.router.navigate(['/clientes']);
  }

  validaCampos(): boolean { 
    return this.nome.valid 
    && this.cpf.valid 
    && this.email.valid 
    && this.telefone.valid;
  }

async create(): Promise<void> {
  try {
    await this.service.addCliente(this.cliente);
    this.toast.success('Cliente cadastrado com sucesso!', 'Cadastro');
    this.router.navigate(['/clientes']);
  }
  catch (ex: any) {
    this.toast.error('Erro ao cadastrar cliente');
    console.log(ex);
  }
}

}