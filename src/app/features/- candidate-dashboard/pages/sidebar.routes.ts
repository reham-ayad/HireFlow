import { Routes } from '@angular/router';
import { Layout } from '../layout/layout';

export const routes: Routes = [
  {
    path: 'dashboard',
    component: Layout,
    children: [
      {
        path: '',
        redirectTo: 'overview',
        pathMatch: 'full'
      },

      {
        path: 'overview',
        loadComponent: () =>
          import('./overview/overview')
            .then(m => m.Overview)
      },

      {
        path: 'applications',
        loadComponent: () =>
          import('./applications/applications')
            .then(m => m.Applications)
      },

      {
        path: 'saved-jobs',
        loadComponent: () =>
          import('./saved-jobs/saved-jobs')
            .then(m => m.SavedJobs)
      },

      {
        path: 'profile',
        loadComponent: () =>
          import('./profile/profile')
            .then(m => m.Profile)
      },

      {
        path: 'settings',
        loadComponent: () =>
          import('./settings/settings')
            .then(m => m.Settings)
      }
    ]
  },

  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },

  {
    path: '**',
    redirectTo: 'dashboard'
  }
];