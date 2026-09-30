import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { Job, JobService } from '../../../services/job/job.service';
import { ApplicationService } from '../../../services/application.service';

@Component({
  selector: 'app-apply-job',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './apply-job.html',
  styleUrl: './apply-job.scss'
})
export class ApplyJob implements OnInit {

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private jobService = inject(JobService);
  private applicationService = inject(ApplicationService);

  job: Job | null = null;

  user: any = null;

  loading = true;
  error = '';
  submitted = false;
  submitting = false;

  ngOnInit(): void {

    this.getUser();

    this.loadJob();

  }

  // =========================
  // GET CURRENT USER
  // =========================

  getUser(): void {

    const userData = localStorage.getItem('user');

    if (!userData) {

      console.log('No user found');

      this.router.navigate(['/login']);

      return;
    }

    this.user = JSON.parse(userData);

    console.log('Current user:', this.user);

  }

  // =========================
  // LOAD JOB
  // =========================

loadJob(): void {
  const jobId = this.route.snapshot.paramMap.get('id');

  console.log(' Job ID:', jobId);

  if (!jobId) {
    this.error = 'Job not found.';
    this.loading = false;
    return;
  }

  this.jobService.getJobById(jobId).subscribe({
    next: (job) => {
      console.log(' API RESPONSE:', job);

      this.loading = false;

      if (!job) {
        this.error = 'Job not found.';
        return;
      }

      this.job = job;

      console.log(' Job loaded successfully');
      console.log(' title:', job.title);
      // console.log(' id:', job._id);
    },

    error: (error) => {
      console.error(' API ERROR:', error);

      this.loading = false;
      this.error = 'Something went wrong while loading the job.';
    }
  });
}
  // =========================
  // APPLY
  // =========================

  submitApplication(): void {

    if (!this.job) {
      return;
    }

    this.submitting = true;

    const jobId = String(this.job._id);

    console.log(
      ' Applying for job:',
      jobId
    );

    this.applicationService
      .addApplication(jobId)
      .subscribe({

        next: (response) => {

          console.log(
            'Application submitted:',
            response
          );

          this.submitting = false;

          this.submitted = true;

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

        }

      });

  }

  // =========================
  // BACK TO JOBS
  // =========================

  goToJobs(): void {

    this.router.navigate(['/jobs']);

  }

}