import { Routes } from '@angular/router';
import { Layout } from '../layout/layout';

export const routes: Routes = [

  {
    path: 'dashboard',
    component: Layout,

    children: [

      {
        path: '',
        redirectTo: 'profile',
        pathMatch: 'full'
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
      },

      {
        path: 'edit-profile',
        loadComponent: () =>
          import('./edit-profile/edit-profile')
            .then(m => m.EditProfile)
      }

    ]
  }

];