
import {
  Component,
  OnInit,
   PLATFORM_ID,
  ChangeDetectorRef,
  inject
} from '@angular/core';

import {
  CommonModule,
  isPlatformBrowser
} from '@angular/common';

import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

import { JobService } from '../../services/job/job.service';
import {
  UserService,
  User
} from '../- candidate-dashboard/user.Service';

import { Company as CompanyModel } from '../- candidate-dashboard/user.Service';

@Component({
  selector: 'app-add-job',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  templateUrl: './add-job.html',
  styleUrl: './add-job.scss'
})
export class AddJob implements OnInit {
  private readonly jobService = inject(JobService);
  private readonly router = inject(Router);
  private readonly userService = inject(UserService);
  private readonly platformId = inject(PLATFORM_ID);
private readonly cdr=inject(ChangeDetectorRef)
  user: User | null = null;

  userCompany: CompanyModel | null = null;

  loadingProfile = true;
  loading = false;

  successMessage = '';
  errorMessage = '';

  jobData = {
    title: '',
    isCompanyUndisclosed: false,
    description: '',
    location: '',
    jobType: 'Full-time',
    salary: '',
    requirements: ''
  };

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      this.loadingProfile = false;
      return;
    }

    this.loadProfile();
  }

  private loadProfile(): void {
    this.loadingProfile = true;
    this.errorMessage = '';

    this.userService.getUserInfo().subscribe({
      next: (response) => {
        const user = response?.user;
console.log('USER COMPANY:', this.userCompany);
        if (!user) {
          this.errorMessage = 'Could not load your profile.';
          this.loadingProfile = false;
          return;
        }

        this.user = user;

        const company = user.company;

        this.userCompany =
          company &&
          typeof company === 'object' &&
          'name' in company &&
          typeof company.name === 'string'
            ? company as CompanyModel
            : null;

        if (!this.userCompany) {
          this.jobData.isCompanyUndisclosed = true;
        }

        this.loadingProfile = false;
this.cdr.detectChanges()
        console.log('Employer profile loaded:', this.user);
        console.log('Employer company:', this.userCompany);
        console.log('USER COMPANY:', this.userCompany);

      },

      error: (error) => {
        console.error('Failed to load employer profile:', error);

        this.errorMessage =
          error.error?.message ||
          'Could not load your profile. Please try again.';

        this.loadingProfile = false;
      }
    });
  }

  createJob(): void {
    this.errorMessage = '';
    this.successMessage = '';

    if (this.loadingProfile) {
      this.errorMessage = 'Please wait until your profile has loaded.';
      return;
    }

    if (!this.user) {
      this.errorMessage = 'Your profile could not be loaded. Please refresh the page.';
      return;
    }

    if (this.user.role !== 'employer') {
      this.errorMessage = 'Only employers can publish jobs.';
      return;
    }

    if (this.loading) {
      return;
    }

    if (
      !this.jobData.title.trim() ||
      !this.jobData.description.trim() ||
      !this.jobData.location.trim()
    ) {
      this.errorMessage = 'Please fill in all required fields.';
      return;
    }

    if (!this.userCompany && !this.jobData.isCompanyUndisclosed) {
      this.errorMessage =
        'Please contact us to register your company first.';
      return;
    }

    this.loading = true;

    const payload = {
      title: this.jobData.title.trim(),
      isCompanyUndisclosed: this.jobData.isCompanyUndisclosed,
      description: this.jobData.description.trim(),
      location: this.jobData.location.trim(),
      jobType: this.jobData.jobType,
      salary: this.jobData.salary.trim(),
      requirements: this.jobData.requirements
        .split('\n')
        .map((item) => item.trim())
        .filter(Boolean)
    };

    this.jobService.createJob(payload).subscribe({
      next: () => {
        this.loading = false;
        this.successMessage = 'Job published successfully!';
console.log("sdfkjgkgjkj")
        setTimeout(() => {
          void this.router.navigate(['/jobs']);
        }, 1000);
      },

      error: (error) => {
        console.error('Create job error:', error);

        this.loading = false;

        this.errorMessage =
          error.error?.message || 'Failed to publish job.';
      }
    });
  }
}

