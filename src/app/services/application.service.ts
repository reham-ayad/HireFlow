import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { Application } from '../models/application.model';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  private readonly storageKey = 'jobApplications';

  private readonly isBrowser: boolean;

  constructor(
    @Inject(PLATFORM_ID) private platformId: object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }


  // =========================
  // Get Applications
  // =========================

  getApplications(): Application[] {

    if (!this.isBrowser) {
      return [];
    }

    const data = localStorage.getItem(this.storageKey);

    return data
      ? JSON.parse(data)
      : [];

  }


  // =========================
  // Add Application
  // =========================

  addApplication(
    application: Application
  ): void {

    if (!this.isBrowser) {
      return;
    }

    const applications = this.getApplications();

    applications.push(application);

    localStorage.setItem(
      this.storageKey,
      JSON.stringify(applications)
    );

  }


  // =========================
  // Check Applied
  // =========================

  hasApplied(jobId: string): boolean {

    const applications = this.getApplications();

    return applications.some(
      application =>
        application.jobId === jobId
    );

  }


  // =========================
  // Get Application By Job
  // =========================

  getApplicationByJobId(
    jobId: string
  ): Application | undefined {

    return this.getApplications().find(
      application =>
        application.jobId === jobId
    );

  }

}