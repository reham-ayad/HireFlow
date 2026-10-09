import { Routes } from '@angular/router';
import { routes as dashboardRoutes } from '../app/features/- candidate-dashboard/pages/sidebar.routes';

export const routes: Routes = [

  // =========================
  // Main Website
  // =========================
  {
    path: '',
    loadComponent: () =>
      import('./layouts/main-layout/main-layout')
        .then(m => m.MainLayout),

    children: [

      {
        path: '',
        loadComponent: () =>
          import('./features/home/home')
            .then(m => m.Home)
      },

      {
        path: 'jobs',
        loadComponent: () =>
          import('./features/job/jobs/jobs')
            .then(m => m.Jobs)
      },

      {
        path: 'jobs/:id/apply',
        loadComponent: () =>
          import('./features/job/apply-job/apply-job')
            .then(m => m.ApplyJob)
      },

      {
        path: 'companies',
        loadComponent: () =>
          import('./features/companies/companies')
            .then(m => m.Companies)
      },

      {
        path: 'about',
        loadComponent: () =>
          import('./features/about/about')
            .then(m => m.About)
      },

      {
        path: 'contact',
        loadComponent: () =>
          import('./features/contact/contact')
            .then(m => m.contact)
      },

      // Auth
      {
        path: 'login',
        loadComponent: () =>
          import('./features/auth/login/login')
            .then(m => m.Login)
      },

      {
        path: 'register',
        loadComponent: () =>
          import('./features/auth/register/register')
            .then(m => m.Register)
      },

      {
        path: 'forgot-password',
        loadComponent: () =>
          import('./features/auth/forgot-password/forgot-password')
            .then(m => m.ForgotPassword)
      }

    ]
  },

  // =========================
  // Candidate Dashboard
  // =========================
  ...dashboardRoutes

];