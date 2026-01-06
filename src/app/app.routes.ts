// Basic
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { HomeComponent } from './components/home/home.component';
import { NavComponent } from './components/nav/nav.component';


export const routes: Routes = [
    {
        path: '', component: NavComponent, canActivate: [],
        children: [
            { path: 'home', component: HomeComponent },
        ]
    }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }
