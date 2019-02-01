import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {AuthGuard} from "./guards/auth.guard";
import {LoginComponent} from "./components/login/login.component";
import {FullComponent} from "./layouts/full/full.component";

// const routes: Routes = [
//   {
//     path: '',
//     component: HomeComponent,
//     canActivate: [AuthGuard]
//   },
//   {
//     path: 'login',
//     component: LoginComponent
//   },
//
//   // otherwise redirect to home
//   { path: '**', redirectTo: '' }
// ];

const routes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      {
        path: '',
        redirectTo: '/starter',
        pathMatch: 'full'
      },
      {
        path: '',
        loadChildren:
          './components/components.module#ComponentsModule'
      },
      {
        path: '',
        canActivate: [AuthGuard],
        loadChildren:
          './material-component/material.module#MaterialComponentsModule'
      },
      {
        path: 'starter',
        loadChildren: './starter/starter.module#StarterModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
