import { Injectable, inject } from '@angular/core';
import { Firestore, collection, collectionData, addDoc, doc, updateDoc, deleteDoc, getDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Cliente } from '../models/cliente';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private firestore = inject(Firestore); // Injeção de dependência moderna
  private clienteCollection = collection(this.firestore, 'clientes'); // Referência à coleção

  constructor() { }

  // READ
  /* getClientes(): Observable<Cliente[]> {
    return collectionData(this.clienteCollection, { idField: 'id' }) as Observable<Cliente[]>;
  } */
 getClientes(): Observable<Cliente[]> {
  return collectionData(this.clienteCollection, { idField: 'id'}).pipe(
    map((clientes: any[]) => 
    clientes.map(cliente => this.normalizarCliente(cliente))
    )
  );
 }

 private normalizarCliente(cliente: any): Cliente {
  return {
    id:               cliente.id                                      ,
    nome:             cliente.nome         ??                       '',
    cpf:              cliente.cpf          ??                       '',
    email:            cliente.email        ??                       '',
    telefone:         cliente.telefone     ??                       '',
    status:           cliente.status       ??                  'ativo',
    observacoes:      cliente.observacoes  ??                       '',
    dataCriacao:      cliente.dataCriacao  ??  new Date().toISOString()
  }
 }


  // CREATE
  addCliente(cliente: Cliente) {
    return addDoc(this.clienteCollection, cliente);
  }

  // UPDATE
  updateCliente(cliente: Cliente) {
    const docRef = doc(this.firestore, `clientes/${cliente.id}`);
    return updateDoc(docRef, { ...cliente });
  }

  // DELETE
  deleteCliente(id: string) {
    const docRef = doc(this.firestore, `clientes/${id}`);
    return deleteDoc(docRef);
  }

  // Cliente por ID
  async getCliente(id: string): Promise<Cliente> {
    const docRef = doc(this.firestore, `clientes/${id}`);
    const docSnap = await getDoc(docRef);
    return { id: docSnap.id, ...docSnap.data() } as Cliente;
  }
}
