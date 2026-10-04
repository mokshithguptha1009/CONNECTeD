import { Routes } from '@angular/router';
import { Auth } from './pages/auth/auth';
import { Verification } from './pages/verification/verification';
import { Dashboard } from './pages/dashboard/dashboard';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'auth',
        pathMatch: 'full'
    },
    {
        path: 'auth',
        component: Auth
    },
    {
        path: 'verification',
        component: Verification
    },
    {
        path: 'dashboard',
        component: Dashboard
    },
    {
        path: '**',
        redirectTo: 'auth'
    }
];