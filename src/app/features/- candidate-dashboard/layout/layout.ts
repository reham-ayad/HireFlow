import { Component } from '@angular/core';
import { DashboardSidebar } from '../components/dashboard-sidebar/dashboard-sidebar';
import { DashboardHeader } from '../components/dashboard-header/dashboard-header';
import { Overview } from '../pages/overview/overview';
import { Applications } from '../pages/applications/applications';
import { SavedJobs } from '../pages/saved-jobs/saved-jobs';
import { Profile } from '../pages/profile/profile';
import { Settings } from '../pages/settings/settings';
import { EditProfile } from '../pages/edit-profile/edit-profile';
import { RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-layout',
  imports: [DashboardSidebar,DashboardHeader,Overview,Applications,SavedJobs,Profile,Settings,EditProfile,RouterOutlet
  
  ],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class Layout {}
