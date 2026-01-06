import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { ClienteService } from '../../../services/cliente.service';
import { Cliente } from '../../../models/cliente';

@Component({
  selector: 'app-cliente-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './cliente-list.component.html',
  styleUrl: './cliente-list.component.css'
})
export class ClienteListComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = [
    'nome',
    'cpf',
    'email',
    'telefone',
    'status',
    'acoes'
  ];

  dataSource = new MatTableDataSource<Cliente>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private clienteService: ClienteService) {}

  ngOnInit(): void {
    this.clienteService.getClientes().subscribe(clientes => {
      this.dataSource.data = clientes;
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;

    this.dataSource.filterPredicate = (data: Cliente, filter: string): boolean => {
      const termo = filter.trim().toLowerCase();

      return (
        data.nome?.toLowerCase().includes(termo) ||
        data.cpf?.toLowerCase().includes(termo) ||
        data.email?.toLowerCase().includes(termo)
      );
    };
  }

  applyFilter(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.dataSource.filter = value.trim().toLowerCase();
  }

  excluir(id: string): void {
    if (confirm('Deseja realmente excluir este cliente?')) {
      this.clienteService.deleteCliente(id);
    }
  }

  excluirSelecionados(): void {
    console.log('Excluir selecionados (a implementar)');
  }
}
