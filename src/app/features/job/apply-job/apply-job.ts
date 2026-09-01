import {
  Component,
  OnInit,
  inject,
  PLATFORM_ID
} from '@angular/core';

import {
  CommonModule,
  isPlatformBrowser
} from '@angular/common';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import {
  ActivatedRoute,
  Router
} from '@angular/router';

import { JobService } from '../../../services/job/job.service';

import {
  ApplicationService
} from '../../../services/application.service';

import {
  AdzunaJob
} from '../../../models/job.model';


@Component({
  selector: 'app-apply-job',

  standalone: true,

  imports: [
    CommonModule,
    ReactiveFormsModule
  ],

  templateUrl: './apply-job.html',

  styleUrl: './apply-job.scss'
})
export class ApplyJob implements OnInit {

  // =========================
  // Inject
  // =========================

  private fb = inject(FormBuilder);

  private route = inject(ActivatedRoute);

  private router = inject(Router);

  private jobService = inject(JobService);

  private applicationService =
    inject(ApplicationService);

  private platformId = inject(PLATFORM_ID);


  // =========================
  // Variables
  // =========================

  job!: AdzunaJob;

  applicationForm!: FormGroup;

  loading = true;

  error = '';

  submitted = false;

  // CV
  selectedCvFile: File | null = null;
selectedCvName = '';
  cvError = '';


  // =========================
  // Init
  // =========================

  ngOnInit(): void {

    this.createForm();

    this.loadJob();

  }


  // =========================
  // Create Form
  // =========================

  createForm(): void {

    this.applicationForm = this.fb.group({

      fullName: [
        '',
        [
          Validators.required,
          Validators.minLength(3)
        ]
      ],

      email: [
        '',
        [
          Validators.required,
          Validators.email
        ]
      ],

      phone: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^01[0125][0-9]{8}$/
          )
        ]
      ],

      experience: [
        '',
        Validators.required
      ],

      coverLetter: [
        '',
        [
          Validators.required,
          Validators.minLength(20)
        ]
      ],

      cvFile: [
        null,
        Validators.required
      ]

    });

  }


  // =========================
  // Load Job
  // =========================

  loadJob(): void {

    const jobId =
      this.route.snapshot.paramMap.get('id');

    if (!jobId) {

      this.error = 'Job not found';

      this.loading = false;

      return;
    }


    // =========================
    // Try sessionStorage first
    // =========================

    if (isPlatformBrowser(this.platformId)) {

      const storedJob =
        sessionStorage.getItem('selectedJob');

      if (storedJob) {

        try {

          const job: AdzunaJob =
            JSON.parse(storedJob);

          // Make sure job matches URL

          if (
            String(job.id) ===
            String(jobId)
          ) {

            this.job = job;

            this.loading = false;

            // Check if already applied

            if (
              this.applicationService
                .hasApplied(String(job.id))
            ) {

              this.submitted = true;

            }

            return;
          }

        } catch (error) {

          console.error(
            'Error reading selected job:',
            error
          );

        }

      }

    }


    // =========================
    // Fallback: API
    // =========================

    this.jobService
      .getJobById(jobId)
      .subscribe({

        next: (job) => {

          this.loading = false;

          if (!job) {

            this.error =
              'Job not found';

            return;
          }

          this.job = job;


          // Check applied only in browser

          if (
            isPlatformBrowser(
              this.platformId
            )
          ) {

            if (
              this.applicationService
                .hasApplied(String(job.id))
            ) {

              this.submitted = true;

            }

          }

        },

        error: (error) => {

          console.error(
            'Error loading job:',
            error
          );

          this.error =
            'Something went wrong while loading the job.';

          this.loading = false;

        }

      });

  }


  // =========================
  // CV Upload
  // =========================

 onCvSelected(event: Event): void {

  const input = event.target as HTMLInputElement;

  this.cvError = '';

  if (!input.files || input.files.length === 0) {
    this.selectedCvFile = null;
    this.selectedCvName = '';

    this.applicationForm
      .get('cvFile')
      ?.setValue(null);

    return;
  }

  const file = input.files[0];

  const allowedTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ];

  if (!allowedTypes.includes(file.type)) {

    this.cvError =
      'Please upload a PDF, DOC, or DOCX file.';

    this.selectedCvFile = null;
    this.selectedCvName = '';

    this.applicationForm
      .get('cvFile')
      ?.setValue(null);

    input.value = '';

    return;
  }

  const maxSize = 5 * 1024 * 1024;

  if (file.size > maxSize) {

    this.cvError =
      'CV file size must be less than 5 MB.';

    this.selectedCvFile = null;
    this.selectedCvName = '';

    this.applicationForm
      .get('cvFile')
      ?.setValue(null);

    input.value = '';

    return;
  }

  // Valid file
  this.selectedCvFile = file;
  this.selectedCvName = file.name;

  this.applicationForm
    .get('cvFile')
    ?.setValue(file);

  this.applicationForm
    .get('cvFile')
    ?.markAsTouched();
}

  // =========================
  // Remove CV
  // =========================

  removeCv(): void {

    this.selectedCvFile = null;

    this.cvError = '';

    this.applicationForm
      .get('cvFile')
      ?.setValue(null);

  }


  // =========================
  // Form Controls
  // =========================

  get f() {

    return this.applicationForm.controls;

  }


  // =========================
  // Submit
  // =========================

  submitApplication(): void {

    // Check form

    if (
      this.applicationForm.invalid
    ) {

      this.applicationForm
        .markAllAsTouched();

      return;

    }


    // Check CV

    if (!this.selectedCvFile) {

      this.cvError =
        'Please upload your CV before submitting.';

      return;

    }


    // Check job

    if (!this.job) {

      return;

    }


    // =========================
    // Create Application
    // =========================

    const application = {

      id: crypto.randomUUID(),

      jobId: this.job.id,

      jobTitle:
        this.job.title,

      company:
        this.job.company.display_name,

      location:
        this.job.location.display_name,

      fullName:
        this.applicationForm
          .value.fullName,

      email:
        this.applicationForm
          .value.email,

      phone:
        this.applicationForm
          .value.phone,

      experience:
        this.applicationForm
          .value.experience,

      coverLetter:
        this.applicationForm
          .value.coverLetter,

      cvFileName:
        this.selectedCvFile.name,

      cvFileType:
        this.selectedCvFile.type,

      cvFileSize:
        this.selectedCvFile.size,

      appliedAt:
        new Date().toISOString()

    };


    // =========================
    // Save Application
    // =========================

    if (
      isPlatformBrowser(
        this.platformId
      )
    ) {

      this.applicationService
        .addApplication(application);

    }


    // =========================
    // Success
    // =========================

    this.submitted = true;

  }


  // =========================
  // Navigation
  // =========================

  goToJobs(): void {

    this.router.navigate([
      '/jobs'
    ]);

  }


  goToApplications(): void {

    this.router.navigate([
      '/dashboard/applications'
    ]);

  }


  goBackToJob(): void {

    if (!this.job) {

      return;

    }


    this.router.navigate([
      '/jobs',
      this.job.id
    ]);

  }

}