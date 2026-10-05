
import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Job, JobService } from '../../../services/job/job.service';
import { ApplicationService } from '../../../services/application.service';

@Component({
  selector: 'app-apply-job',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './apply-job.html',
  styleUrl: './apply-job.scss'
})
export class ApplyJob implements OnInit {

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private jobService = inject(JobService);
  private applicationService = inject(ApplicationService);

  // Change Detector
  private cdr = inject(ChangeDetectorRef);

  job: Job | null = null;

  user: any = null;

  loading = true;
  error = '';

  submitted = false;
  submitting = false;

  coverLetter = '';

  // =========================
  // INIT
  // =========================

  ngOnInit(): void {
    this.getUser();
    this.loadJob();
  }

  // =========================
  // Get Current User
  // =========================

  getUser(): void {

    const userData = localStorage.getItem('user');

    if (!userData) {

      console.log('No user found');

      this.router.navigate(['/login']);

      return;
    }

    try {

      this.user = JSON.parse(userData);

      console.log('Current user:', this.user);

      // Update UI
      this.cdr.detectChanges();

    } catch (error) {

      console.error('Error parsing user:', error);

      localStorage.removeItem('user');

      this.router.navigate(['/login']);
    }
  }

  // =========================
  // Load Job
  // =========================

  loadJob(): void {

    const jobId = this.route.snapshot.paramMap.get('id');

    console.log('Job ID:', jobId);

    // No Job ID
    if (!jobId) {

      this.error = 'Job not found.';
      this.loading = false;

      this.cdr.detectChanges();

      return;
    }

    // Start Loading
    this.loading = true;
    this.error = '';

    this.cdr.detectChanges();

    // Get Job From API
    this.jobService.getJobById(jobId).subscribe({
next: (job) => {
  console.log('API RESPONSE:', job);

  this.job = job;
  this.loading = false;

  console.log('JOB AFTER ASSIGN:', this.job);

  setTimeout(() => {
    this.cdr.detectChanges();
  });
},
      error: (error) => {

        console.error(
          'API ERROR:',
          error
        );

        this.loading = false;

        this.error =
          error?.error?.message ||
          'Something went wrong while loading the job.';

        // Force UI Update
        this.cdr.detectChanges();
      }

    });
  }

  // =========================
  // Submit Application
  // =========================

  submitApplication(): void {

    if (!this.job || !this.user) {
      return;
    }

    // =========================
    // Validate Cover Letter
    // =========================

    if (!this.coverLetter.trim()) {

      this.error =
        'Please write a cover letter before submitting.';

      this.cdr.detectChanges();

      return;
    }

    // Start Submitting
    this.submitting = true;
    this.error = '';

    this.cdr.detectChanges();

    const jobId = String(
      this.job._id
    );

    console.log(
      'Applying for job:',
      jobId
    );

    // =========================
    // Application Data
    // =========================

    const applicationData = {

      fullName:
        this.user.name || '',

      email:
        this.user.email || '',

      phone:
        this.user.phone || '',

      location:
        this.user.location || '',

      jobTitle:
        this.user.jobTitle || '',

      skills:
        this.user.skills || [],

      resume:
        this.user.resume || '',

      coverLetter:
        this.coverLetter.trim()
    };

    console.log(
      'Application data:',
      applicationData
    );

    // =========================
    // Send Application
    // =========================

    this.applicationService
      .addApplication(
        jobId,
        applicationData
      )
      .subscribe({

        next: (response) => {

          console.log(
            'Application submitted:',
            response
          );

          this.submitting = false;

          this.submitted = true;

          this.coverLetter = '';

          // Update UI
          this.cdr.detectChanges();
        },

        error: (error) => {

          console.error(
            'Application error:',
            error
          );

          this.submitting = false;

          this.error =
            error?.error?.message ||
            'Something went wrong while submitting your application.';

          // Update UI
          this.cdr.detectChanges();
        }

      });
  }

  // =========================
  // Cancel / Back To Jobs
  // =========================

  goToJobs(): void {

    this.router.navigate([
      '/jobs'
    ]);
  }
}

