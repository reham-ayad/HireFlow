import { Component, inject, OnInit, ChangeDetectorRef} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { forkJoin, of } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';
import {
  JobService,
  Job
} from '../../../services/job/job.service';
import { CompanyService } from '../../../services/company.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-jobs',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './jobs.html',
  styleUrl: './jobs.scss'
})
export class Jobs implements OnInit {

  private router = inject(Router);
  public jobService = inject(JobService);
  public companyService = inject(CompanyService);
    private cdr = inject(ChangeDetectorRef);
  private snackBar = inject(MatSnackBar);

  // =========================
  // DATA
  // =========================

  jobs: any[] = [];
  filteredJobs: any[] = [];
  companys: any[] = [];
  // =========================
  // UI STATE
  // =========================

  loading = false;
  errorMessage = '';

  // =========================
  // SEARCH
  // =========================

  searchTerm = '';

  // =========================
  // SORT
  // =========================

  sortBy = 'newest';

  // =========================
  // FILTERS
  // =========================

  selectedTypes: string[] = [];

  maxSalary = 300;

  selectedExperience = 'All levels';

  selectedWorkMode = 'All';

  selectedDate = 'Last 7 days';

  // =========================
  // PAGINATION
  // =========================

  currentPage = 1;
  totalPages = 1;

  // =========================
  // INIT
  // =========================

  ngOnInit(): void {
    this.loadJobs();
  }

  // =========================
  // LOAD JOBS
  // =========================
 loadJobs(): void {
  this.loading = true;
  this.errorMessage = '';

  this.jobService.getJobs().subscribe({
    next: (response) => {
      const jobs = response.jobs ?? [];

      this.jobs = jobs.map((job: Job) => ({
        id: job._id,
        title: job.title,
        companyname: job.company.name,
        location: job.location ?? 'remote',
        description: job.description ?? 'No description available',
        salary: job.salary ?? 'Salary not specified',
        salaryMin: this.extractSalaryMin(job.salary),
        salaryMax: this.extractSalaryMax(job.salary),
        postedAt: this.formatDate(job.createdAt),
        created: job.createdAt,
        type: job.jobType ?? 'Full-time',
        workMode: 'On-site',
        level: 'All levels',
        icon: 'fa-solid fa-building',
        featured: false
      }));

      this.filterJobs();
      this.loading = false;
      this.cdr.markForCheck();
    },

    error: (error) => {
      console.error('FAILED TO LOAD JOBS:', error);
      this.errorMessage = 'Failed to load jobs. Please try again.';
      this.loading = false;
      this.cdr.markForCheck();
    }
  });
}
  // =========================
  // SEARCH
  // =========================

  searchJobs(): void {

    this.currentPage = 1;

    this.filterJobs();

  }

  // =========================
  // FILTER
  // =========================

  filterJobs(): void {

    let result = [...this.jobs];

    // Search
    if (this.searchTerm.trim()) {

      const term =
        this.searchTerm
          .toLowerCase()
          .trim();

      result = result.filter(job =>

        job.title
          ?.toLowerCase()
          .includes(term) ||

        job.companyname
          ?.toLowerCase()
          .includes(term) ||

        job.description
          ?.toLowerCase()
          .includes(term)

      );

    }

    // Job Type
    if (this.selectedTypes.length > 0) {

      result = result.filter(job =>
        this.selectedTypes.includes(job.type)
      );

    }

    // Salary
    result = result.filter(job => {

      if (!job.salaryMax && !job.salaryMin) {
        return true;
      }

      const salary =
        job.salaryMax || job.salaryMin;

      return salary / 1000 <= this.maxSalary;

    });

    // Experience
    if (
      this.selectedExperience !==
      'All levels'
    ) {

      result = result.filter(job =>
        job.level ===
        this.selectedExperience
      );

    }

    // Work Mode
    if (
      this.selectedWorkMode !== 'All'
    ) {

      result = result.filter(job =>
        job.workMode ===
        this.selectedWorkMode
      );

    }

    this.filteredJobs = result;

    this.sortJobs();

  }

  // =========================
  // JOB TYPE
  // =========================

  toggleJobType(type: string): void {

    if (this.selectedTypes.includes(type)) {

      this.selectedTypes =
        this.selectedTypes.filter(
          t => t !== type
        );

    } else {

      this.selectedTypes.push(type);

    }

    this.filterJobs();

  }

  // =========================
  // WORK MODE
  // =========================

  setWorkMode(mode: string): void {

    this.selectedWorkMode = mode;

    this.filterJobs();

  }

  // =========================
  // SORT
  // =========================

  sortJobs(): void {

    if (this.sortBy === 'newest') {

      this.filteredJobs.sort(
        (a, b) =>
          new Date(b.created).getTime() -
          new Date(a.created).getTime()
      );

    }

    else if (this.sortBy === 'oldest') {

      this.filteredJobs.sort(
        (a, b) =>
          new Date(a.created).getTime() -
          new Date(b.created).getTime()
      );

    }

    else if (this.sortBy === 'salaryHigh') {

      this.filteredJobs.sort(
        (a, b) =>
          (b.salaryMax || 0) -
          (a.salaryMax || 0)
      );

    }

    else if (this.sortBy === 'salaryLow') {

      this.filteredJobs.sort(
        (a, b) =>
          (a.salaryMin || 0) -
          (b.salaryMin || 0)
      );

    }

  }

  // =========================
  // CLEAR FILTERS
  // =========================

  clearFilters(): void {

    this.searchTerm = '';

    this.selectedTypes = [];

    this.maxSalary = 300;

    this.selectedExperience =
      'All levels';

    this.selectedWorkMode = 'All';

    this.selectedDate =
      'Last 7 days';

    this.sortBy = 'newest';

    this.currentPage = 1;

    this.filterJobs();

  }

  // =========================
  // APPLY
  // =========================

  applyNow(job: any): void {

    const jobId = job?.id;

    if (!jobId) {

      console.error(
        'No job id found for apply action'
      );

      return;

    }

    void this.router.navigate([
      '/jobs',
      jobId,
      'apply'
    ]);

  }

  // =========================
  // PAGINATION
  // =========================

  previousPage(): void {

    if (this.currentPage > 1) {

      this.currentPage--;

    }

  }

  nextPage(): void {

    if (
      this.currentPage <
      this.totalPages
    ) {

      this.currentPage++;

    }

  }

  // =========================
  // SALARY
  // =========================

  private extractSalaryMin(
    salary?: string
  ): number {

    if (!salary) {
      return 0;
    }

    const numbers =
      salary.match(/\d+(?:,\d+)?/g);

    if (!numbers?.length) {
      return 0;
    }

    return Number(
      numbers[0].replace(/,/g, '')
    );

  }

  private extractSalaryMax(
    salary?: string
  ): number {

    if (!salary) {
      return 0;
    }

    const numbers =
      salary.match(/\d+(?:,\d+)?/g);

    if (
      !numbers ||
      numbers.length < 2
    ) {

      return this.extractSalaryMin(
        salary
      );

    }

    return Number(
      numbers[1].replace(/,/g, '')
    );

  }

  // =========================
  // DATE
  // =========================

  private formatDate(
    date: string
  ): string {

    const postedDate =
      new Date(date);

    const now =
      new Date();

    const diff =
      now.getTime() -
      postedDate.getTime();

    const days =
      Math.floor(
        diff /
        (1000 * 60 * 60 * 24)
      );

    if (days <= 0) {
      return 'Today';
    }

    if (days === 1) {
      return '1 day ago';
    }

    return `${days} days ago`;

  }


  savejob(job: any): void {
 const jobId = job?.id;

    if (!jobId) {

      console.error(
        'No job id found for save action'
      );

      return;

    }

    this.jobService
      .saveJob(jobId)
      .subscribe({

        next: () => {

          this.snackBar.open(
        'Job saved successfully!', 
        'Close',
        {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top'

        }
      );
        },

        error: (error) => {
                 this.snackBar.open(
        'Failed to save job!', 
        'Close',
        {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top'

        }
      );

          console.error(
            'Failed to save job:',
            error
          );

        }

      });

  }

}
