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
      id:           '',
      nome:         '',
      cpf:          '',
      email:        '',
      telefone:        '',
      dataCriacao:  '',
      status: 'ativo'
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

    ngOnInit(): void {
      this.cliente.id = this.route.snapshot.paramMap.get('id')!;
    }
  
    validaCampos(): boolean { 
      return this.nome.valid 
      && this.cpf.valid 
      && this.email.valid 
      && this.telefone.valid
      && this.status.valid;
    }

    toggleStatus(): void { 
      if (this.cliente.status === 'ativo') {
        this.cliente.status = 'inativo';
      } else {
        this.cliente.status = 'ativo';
      }
    }


  
}