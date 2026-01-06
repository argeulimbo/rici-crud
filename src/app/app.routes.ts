import { RouterModule, Routes } from '@angular/router';
// Imports Components
import { HomeComponent } from './components/home/home.component';
import { NavComponent } from './components/nav/nav.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [
    {
        path: '', component: NavComponent, canActivate: [],
        children: [
            { path: 'home', component: HomeComponent }
        ]
    }
    // { 
    //     path: 'home', component: HomeComponent
    // }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }
