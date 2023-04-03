import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { LoginComponent } from './login/login.component';

import { AccueilDashboardComponent } from './accueil-dashboard/accueil-dashboard.component';
import { SidebarComponent } from './users/sidebar/sidebar.component';
import { TableHistoriqueComponent } from './table-historique/table-historique.component';
import { GestionArrosageComponent } from './gestion-arrosage/gestion-arrosage.component';
import { LocalisationComponent } from './localisation/localisation.component';
import { ModifComponent } from './modif/modif.component';
import { AuthGuard } from "./services/user.guard";

const routes: Routes = [

{path:"acceuil", component: AccueilDashboardComponent /*, canActivate: [AuthGuard]*/ },

{path:"login", component: LoginComponent},
{path:"sides", component: SidebarComponent, canActivate: [AuthGuard] },
{path:"", component: LoginComponent},

{path:"table", component: TableHistoriqueComponent, canActivate: [AuthGuard]},

{path:"sides", component: SidebarComponent, canActivate: [AuthGuard]},
{path:"arrosage", component: GestionArrosageComponent, canActivate: [AuthGuard] },
{path:"localisation", component: LocalisationComponent, canActivate: [AuthGuard] },
{path:"modif", component: ModifComponent},

{ path: '', redirectTo: '/login', pathMatch: 'full' },
/* { path: '**', redirectTo: '/accueil' }, */






];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
  
})
export class AppRoutingModule { }
