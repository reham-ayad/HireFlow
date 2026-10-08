
import { Component, OnInit,PLATFORM_ID,ChangeDetectorRef, inject } from '@angular/core';

import { JobCard } from '../../components/job-card/job-card';
import { isPlatformBrowser } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

import {
  UserService,
  SavedJob,
} from '../../user.Service';

import { Router } from '@angular/router';
import { forkJoin, of } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';
import {JobService, Job} from '../../../../services/job/job.service';
@Component({
  selector: 'app-saved-jobs',


  imports: [JobCard],
  templateUrl: './saved-jobs.html',
  styleUrl: './saved-jobs.scss',
})
export class SavedJobs implements OnInit {

  savedJobs: SavedJob[] = [];

  loading = false;
  errorMessage = '';
        private platformId = inject(PLATFORM_ID);
          private cdr = inject(ChangeDetectorRef);
private router =inject(Router)
private snackBar = inject(MatSnackBar);

  

  constructor(
    private userService: UserService,
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.getSavedJobs();
    }
  }

  getSavedJobs(): void {
    this.loading = true;
    this.errorMessage = '';

    this.userService.getUserSavedJobs().subscribe({
      next: (response) => {
        this.savedJobs = response.savedJobs;
        this.loading = false;
this.cdr.detectChanges();
        console.log('Saved Jobs:', this.savedJobs);
      },

      error: (error) => {
        console.error('Get saved jobs error:', error);

        this.errorMessage =
          error.error?.message || 'Failed to load saved jobs.';

        this.loading = false;
      },
    });
  }

  deleteSavedJob(jobId: string): void {
    this.userService.deleteSavedJob(jobId).subscribe({
      next: () => {
        this.savedJobs = this.savedJobs.filter(
          (savedJob) => savedJob.job._id !== jobId
          
        );
        this.cdr.detectChanges();
        this.snackBar.open(
        'succssflly Deleted From Saved List ',
        'Close',
        {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top'

        }
      );

      },

      error: (error) => {
        console.error('Delete saved job error:', error);
      },
    });
  }



 applyNow(jobId: string): void {
  if (!jobId) {
    console.error('No job id found for apply action');
    return;
  }

  void this.router.navigate([
    '/jobs',
    jobId,
    'apply'
  ]);
}
}

