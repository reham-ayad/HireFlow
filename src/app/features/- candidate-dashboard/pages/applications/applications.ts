import { Component, inject, OnInit, PLATFORM_ID,ChangeDetectorRef } from '@angular/core';
import {
  CommonModule,
  isPlatformBrowser
} from '@angular/common';


import { ApplicationService } from '../../../../services/application.service';
import { Application } from '../../../../models/application.model';

@Component({
  selector: 'app-applications',
  imports: [CommonModule],
  templateUrl: './applications.html',
  styleUrl: './applications.scss'
})
export class Applications implements OnInit {

  private applicationService = inject(ApplicationService);
  private cdr = inject(ChangeDetectorRef);
    private platformId = inject(PLATFORM_ID);

  applications: Application[] = [];

  loading = true;

  ngOnInit(): void {
    
      if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.applicationService.getApplications().subscribe({
      next: (response) => {
        console.log('APPLICATIONS LOADED:', response);

        this.applications = response.applications;
        this.loading = false;
        this.cdr.detectChanges();
      },

      error: (error) => {
        console.error('APPLICATIONS ERROR:', error);
        this.loading = false;
      }
    });
  }
}