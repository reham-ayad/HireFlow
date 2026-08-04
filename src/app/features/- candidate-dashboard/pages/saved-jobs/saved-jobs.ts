import { Component } from '@angular/core';
import { JobCard } from '../../components/job-card/job-card';

@Component({
  selector: 'app-saved-jobs',
  imports: [JobCard],
  templateUrl: './saved-jobs.html',
  styleUrl: './saved-jobs.scss',
})
export class SavedJobs {}
