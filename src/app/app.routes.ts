import { Routes } from '@angular/router';
import { routes as dashboardRoutes } from './features/- candidate-dashboard/pages/sidebar.routes';

// export const routes: Routes = dashboardRoutes;

export const routes: Routes = [

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
      },







    //   {
    //     path: 'post-job',
    //     loadComponent: () =>
    //       import('./features/post-job/post-job')
    //         .then(m => m.PostJob)
    //   }
    ]
  },

  // Dashboard
  {
    path: 'dashboard',
    children: dashboardRoutes
  }

];