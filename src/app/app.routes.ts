import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { NabooComponent } from './pages/naboo/naboo.component';
import { StayComponent } from './pages/stay/stay.component';
import { authGuard } from './auth.guard';

export const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'naboo', component: NabooComponent }, // Protected
  { path: 'stay', component: StayComponent },   // Protected
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Default to 'home' (which is protected)
  { path: 'login', component: LoginComponent }, // Public
  { path: 'signup', component: SignupComponent }, // Public
  { path: '**', redirectTo: '/home' } // Redirect all unknown paths to 'home' (protected)
];