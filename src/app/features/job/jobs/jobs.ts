import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router ,RouterOutlet } from '@angular/router';
import { JobService } from '../../../services/job/job.service';
import {
  AdzunaJob
} from '../../../models/job.model';


@Component({
  selector: 'app-jobs',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    FormsModule
  ],
  templateUrl: './jobs.html',
  styleUrl: './jobs.scss'
})
export class Jobs implements OnInit {
private router = inject(Router);
  private jobService = inject(JobService);

  // =========================
  // DATA
  // =========================

  jobs: any[] = [];
  filteredJobs: any[] = [];

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

      next: (response: any) => {

        const jobs = response?.results ?? [];

        console.log('API RESPONSE:', response);

        this.jobs = jobs.map((job: any) => ({

          id: job.id,

          title: job.title,

          company: job.company?.display_name ?? 'Unknown Company',

          location: job.location?.display_name ?? 'Unknown Location',

          description: job.description ?? 'No description available',

          salary: this.formatSalary(
            job.salary_min,
            job.salary_max
          ),

          salaryMin: job.salary_min ?? 0,

          salaryMax: job.salary_max ?? 0,

          postedAt: this.formatDate(job.created),

          created: job.created,

          type: 'Full-time',

          workMode: 'On-site',

          level: 'All levels',

          icon: 'fa-solid fa-building',

          featured: false,

          redirectUrl: job.redirect_url

        }));

        // أول فلترة
        this.filterJobs();

        // مهم جدًا
        this.loading = false;

      },

      error: (error) => {

        console.error('FAILED TO LOAD JOBS:', error);

        this.errorMessage =
          'Failed to load jobs. Please try again.';

        this.loading = false;

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

      const term = this.searchTerm
        .toLowerCase()
        .trim();

      result = result.filter(job =>

        job.title?.toLowerCase().includes(term) ||

        job.company?.toLowerCase().includes(term) ||

        job.description?.toLowerCase().includes(term)

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
    if (this.selectedExperience !== 'All levels') {

      result = result.filter(job =>
        job.level === this.selectedExperience
      );

    }

    // Work Mode
    if (this.selectedWorkMode !== 'All') {

      result = result.filter(job =>
        job.workMode === this.selectedWorkMode
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
        this.selectedTypes.filter(t => t !== type);

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

    this.selectedExperience = 'All levels';

    this.selectedWorkMode = 'All';

    this.selectedDate = 'Last 7 days';

    this.sortBy = 'newest';

    this.currentPage = 1;

    this.filterJobs();

  }

  // =========================
  // APPLY
  // =========================

  // applyNow(job: any): void {

  //   if (job.redirectUrl) {

  //     window.open(
  //       job.redirectUrl,
  //       '_blank'
  //     );

  //   }

  // }

  applyNow(job: AdzunaJob): void {

  const jobId = job?.id;

  if (!jobId) {
    console.error('No job id found for apply action');
    return;
  }

  // Save the selected job temporarily
  sessionStorage.setItem(
    'selectedJob',
    JSON.stringify(job)
  );

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

    if (this.currentPage < this.totalPages) {

      this.currentPage++;

    }

  }

  // =========================
  // SALARY
  // =========================

  private formatSalary(
    min?: number,
    max?: number
  ): string {

    if (!min && !max) {

      return 'Salary not specified';

    }

    if (min && max) {

      return `$${Math.round(min / 1000)}k - $${Math.round(max / 1000)}k`;

    }

    if (min) {

      return `From $${Math.round(min / 1000)}k`;

    }

    return `Up to $${Math.round(max! / 1000)}k`;

  }

  // =========================
  // DATE
  // =========================

  private formatDate(date: string): string {

    const postedDate = new Date(date);

    const now = new Date();

    const diff =
      now.getTime() -
      postedDate.getTime();

    const days = Math.floor(
      diff / (1000 * 60 * 60 * 24)
    );

    if (days <= 0) {

      return 'Today';

    }

    if (days === 1) {

      return '1 day ago';

    }

    return `${days} days ago`;

  }

}