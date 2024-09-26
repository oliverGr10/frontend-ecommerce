
import { Routes } from '@angular/router';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomePageComponent } from './components/home-page/home-page.component';



export const routes: Routes = [
    {path:'', redirectTo:'home', pathMatch:'full'},
    {path:'home',component:HomePageComponent },
    {path:'dashboard', component:DashboardComponent},
    {path:'signIn',component:SignInComponent},
    {path:'**', redirectTo:'home', pathMatch:'full'}
];

