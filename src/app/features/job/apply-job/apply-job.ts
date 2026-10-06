import {
  Component,
  OnInit,
  inject,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import {
  Job,
  JobService
} from '../../../services/job/job.service';

import {
  ApplicationService
} from '../../../services/application.service';

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

  private cdr = inject(ChangeDetectorRef);

private snackBar = inject(MatSnackBar);
  // =========================
  // DATA
  // =========================

  job: Job | null = null;

  user: any = null;


  // =========================
  // APPLICATION FORM
  // =========================

  application = {
    fullName: '',
    email: '',
    phone: '',
    location: '',
    jobTitle: '',
    skills: [] as string[],
    resume: ''
  };

  coverLetter = '';


  // =========================
  // STATE
  // =========================

  loading = true;

  error = '';

  submitted = false;

  submitting = false;


  // =========================
  // INIT
  // =========================

  ngOnInit(): void {

    this.getUser();

    this.loadJob();

  }


  // =========================
  // GET CURRENT USER
  // =========================

  getUser(): void {

    const userData =
      localStorage.getItem('user');


    if (!userData) {

      console.log('No user found');

      this.router.navigate(['/login']);

      return;
    }


    try {

      this.user =
        JSON.parse(userData);


      console.log(
        'Current user:',
        this.user
      );


      // Fill application form
      // with user's existing data

      this.application = {

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
          this.user.resume || ''

      };


      console.log(
        'Application form:',
        this.application
      );


      this.cdr.detectChanges();


    } catch (error) {

      console.error(
        'Error parsing user:',
        error
      );


      localStorage.removeItem('user');


      this.router.navigate([
        '/login'
      ]);
    }
  }


  // =========================
  // LOAD JOB
  // =========================

  loadJob(): void {

    const jobId =
      this.route.snapshot.paramMap.get('id');


    console.log(
      'Job ID:',
      jobId
    );


    if (!jobId) {

      this.error =
        'Job not found.';

      this.loading = false;

      this.cdr.detectChanges();

      return;
    }


    this.loading = true;

    this.error = '';


    this.jobService
      .getJobById(jobId)
      .subscribe({

        next: (job) => {

          console.log(
            'API RESPONSE:',
            job
          );


          this.job = job;

          this.loading = false;


          console.log(
            'JOB AFTER ASSIGN:',
            this.job
          );


          this.cdr.detectChanges();

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


          this.cdr.detectChanges();

        }

      });
  }


  // =========================
  // SUBMIT APPLICATION
  // =========================

  submitApplication(): void {

    // Make sure job exists
    if (!this.job) {

      this.error =
        'Job information is not available.';

      return;
    }


    // =========================
    // VALIDATION
    // =========================

    if (
      !this.application.fullName.trim()
    ) {

      this.error =
        'Please enter your full name.';

      return;
    }


    if (
      !this.application.email.trim()
    ) {

      this.error =
        'Please enter your email.';

      return;
    }


    if (
      !this.application.phone.trim()
    ) {

      this.error =
        'Please enter your phone number.';

      return;
    }


    if (
      !this.coverLetter.trim()
    ) {

      this.error =
        'Please write a cover letter before submitting.';

      return;
    }


    // =========================
    // START SUBMITTING
    // =========================

    this.submitting = true;

    this.error = '';

    this.cdr.detectChanges();


    const jobId =
      String(this.job._id);


    // console.log(
    //   'Applying for job:',
    //   jobId
    // );


    // =========================
    // APPLICATION DATA
    // =========================

    const applicationData = {

      fullName:
        this.application.fullName.trim(),

      email:
        this.application.email.trim(),

      phone:
        this.application.phone.trim(),

      location:
        this.application.location.trim(),

      jobTitle:
        this.application.jobTitle.trim(),

      skills:
        this.application.skills,

      resume:
        this.application.resume.trim(),

      coverLetter:
        this.coverLetter.trim()

    };


    // console.log(
    //   'Application data:',
    //   applicationData
    // );


    // =========================
    // SEND TO BACKEND
    // =========================

    this.applicationService
      .addApplication(
        jobId,
        applicationData
      )
      .subscribe({

        next: (response) => {
  this.snackBar.open(
        'Application submitted successfully!',
        'Close',
        {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top'

        }
      );
          // console.log(
          //   'Application submitted:',
          //   response
          // );


          this.submitting = false;

          this.submitted = true;


          this.cdr.detectChanges();

        },


        error: (error) => {

          // console.error(
          //   'Application error:',
          //   error
          // );
          this.snackBar.open(
        'Something went wrong while submitting your application.',
        'Close',
        {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top'

        }
      );


          this.submitting = false;


          this.error =
            error?.error?.message ||
            'Something went wrong while submitting your application.';

          this.cdr.detectChanges();

        }

      });
  }


  // =========================
  // CANCEL
  // =========================

  goToJobs(): void {

    this.router.navigate([
      '/jobs'
    ]);
  }

}