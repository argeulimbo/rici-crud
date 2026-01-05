import { Injectable, inject } from '@angular/core';
import { Firestore, collection, collectionData, addDoc, doc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Cliente } from '../models/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private firestore = inject(Firestore); // Injeção de dependência moderna
  private clienteCollection = collection(this.firestore, 'clientes'); // Referência à coleção

  constructor() { }

  // READ
  getClientes(): Observable<Cliente[]> {
    return collectionData(this.clienteCollection, { idField: 'id' }) as Observable<Cliente[]>;
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
}
