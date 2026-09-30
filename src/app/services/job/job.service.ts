import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface Job {
  _id: string;
  title: string;
  company: string;
  description: string;
  location: string;
  jobType: string;
  salary: string;
  requirements: string[];
  createdAt: string;
  updatedAt: string;
}

export interface JobsResponse {
  jobs: Job[];
}

@Injectable({
  providedIn: 'root'
})
export class JobService {

  private http = inject(HttpClient);

  private readonly apiUrl =
    'https://hireflow-backend-one.vercel.app/api/jobs';

  // Get All Jobs
  getJobs(): Observable<JobsResponse> {
    return this.http.get<JobsResponse>(this.apiUrl);
  }

  // Get Job By ID
getJobById(id: string): Observable<Job> {
  return this.http.get<{ job: Job }>(
    `${this.apiUrl}/${id}`
  ).pipe(
    map(response => response.job)
  );
}
  // Create Job
  createJob(job: Partial<Job>): Observable<Job> {
    return this.http.post<Job>(this.apiUrl, job);
  }
}