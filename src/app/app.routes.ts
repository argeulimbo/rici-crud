// Basic
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { HomeComponent } from './components/home/home.component';
import { NavComponent } from './components/nav/nav.component';
import { ClienteListComponent } from './components/cliente/cliente-list/cliente-list.component';
import { ClienteCreateComponent } from './components/cliente/cliente-create/cliente-create.component';


export const routes: Routes = [
    {
        path: '', component: NavComponent,
        children: [
            { path: 'home',                     component: HomeComponent          },
            { path: 'clientes',                 component: ClienteListComponent   },
            { path: 'clientes/create',          component: ClienteCreateComponent }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }
