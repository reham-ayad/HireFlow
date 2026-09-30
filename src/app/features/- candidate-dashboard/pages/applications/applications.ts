import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApplicationService } from '../../../../services/application.service';
import { JobService } from '../../../../services/job/job.service';

import { Application } from '../../../../models/application.model';

@Component({
  selector: 'app-applications',
  imports: [CommonModule],
  templateUrl: './applications.html',
  styleUrl: './applications.scss',
})
export class Applications implements OnInit {

  private applicationService = inject(ApplicationService);
  private jobService = inject(JobService);

  applications: Application[] = [];

  jobs: {
    [jobId: string]: any
  } = {};

  loading = true;


  // =========================
  // Load Applications
  // =========================

  ngOnInit(): void {

    this.applicationService
      .getApplications()
      .subscribe({

        next: (applications) => {

          this.applications = applications;

          this.loadJobs();

        },

        error: (error) => {

          console.log(
            'Failed to load applications:',
            error
          );

          this.loading = false;

        }

      });

  }


  // =========================
  // Load Jobs
  // =========================

  loadJobs(): void {

    if (this.applications.length === 0) {

      this.loading = false;

      return;

    }

    let loadedJobs = 0;

    this.applications.forEach((application) => {

      this.jobService
        .getJobById(application.jobId)
        .subscribe({

          next: (job) => {

            this.jobs[application.jobId] = job;

            loadedJobs++;

            if (
              loadedJobs === this.applications.length
            ) {

              this.loading = false;

            }

          },

          error: (error) => {

            console.log(
              `Failed to load job ${application.jobId}:`,
              error
            );

            loadedJobs++;

            if (
              loadedJobs === this.applications.length
            ) {

              this.loading = false;

            }

          }

        });

    });

  }


  // =========================
  // Get Job
  // =========================

  getJob(jobId: string): any {

    return this.jobs[jobId];

  }

}