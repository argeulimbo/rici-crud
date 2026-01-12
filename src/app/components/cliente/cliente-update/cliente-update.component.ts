import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { ClienteService } from '../../../services/cliente.service';
import { Cliente } from '../../../models/cliente';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cliente-update',
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
    NgxMaskDirective,
    RouterLink
  ],
  templateUrl: './cliente-update.component.html',
  styleUrl: './cliente-update.component.css'
})

export class ClienteUpdateComponent {

  cliente: Cliente = {
      id:              '',
      nome:            '',
      cpf:             '',
      email:           '',
      telefone:        '',
      dataCriacao:     '',
      status:      'Ativo'
    }
  
    nome: FormControl = new FormControl(null, Validators.minLength(3));
    cpf: FormControl = new FormControl(null, Validators.required);
    email: FormControl = new FormControl(null, Validators.email);
    telefone: FormControl = new FormControl(null, Validators.minLength(3));
    status: FormControl = new FormControl(null, Validators.required);
    
    constructor(private router: Router,
                private route: ActivatedRoute,
                private service: ClienteService,
                private toast: ToastrService
    ) { }
  
    cancelar() {
      this.router.navigate(['/clientes']);
    }

    async ngOnInit(): Promise<void> {
      const id = this.route.snapshot.paramMap.get('id');

      if (!id) {
        this.toast.error('ID do cliente não informado.');
        this.router.navigate(['/clientes']);
        return;
      }

      try {
        this.cliente = await this.service.getCliente(id);
        this.nome.setValue(this.cliente.nome);
        this.cpf.setValue(this.cliente.cpf);
        this.email.setValue(this.cliente.email);
        this.telefone.setValue(this.cliente.telefone);
        this.status.setValue(this.cliente.status);

      } catch (error) {
        this.toast.error('Erro ao carregar cliente.');
        this.router.navigate(['/clientes']);
      }

    }

    findById(): void {
      this.service.getCliente(this.cliente.id)
    } 
  
    validaCampos(): boolean { 
      return this.nome.valid 
      && this.cpf.valid 
      && this.email.valid 
      && this.telefone.valid
      && this.status.valid;
    }

    toggleStatus(): void { 
      if (this.cliente.status === 'Ativo') {
        this.cliente.status = 'Inativo';
      } else {
        this.cliente.status = 'Ativo';
      }
      this.toast.success('Status alterado com sucesso!', 'Status Cliente');
    }

    async update(): Promise<void> {
      if (!this.cliente.id) {
        this.toast.error('ID do cliente inválido!');
        return;
      }

      if (!this.validaCampos()) {
        this.toast.error('Preenche todos os campos corretamente!');
        return;
      }

        this.cliente.nome = this.nome.value!;
        this.cliente.cpf = this.cpf.value!;
        this.cliente.email = this.email.value!;
        this.cliente.telefone = this.telefone.value!;
        this.cliente.status = this.status.value!;

        try {
          await this.service.updateCliente(this.cliente);
          this.toast.success('Cliente atualizado com sucesso', 'Atualização');
          this.router.navigate(['/clientes']);
        } catch (error) {
          this.toast.error('Erro ao atualizar o cliente.');
          console.log(error);
        }
    }

}