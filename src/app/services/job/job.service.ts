import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Job {
  _id: string;
  name:string;
  title: string;
  company: {
  _id: string;
  name: string;
  logo?: string;
};
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

export interface CreateJobPayload {
  title: string;
  isCompanyUndisclosed: boolean;
  description: string;
  location: string;
  jobType: string;
  salary: string;
  requirements: string[];
}

@Injectable({
  providedIn: 'root'
})
export class JobService {

  private http = inject(HttpClient);

  private readonly apiUrl =
    environment.apiUrl + '/jobs';


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
createJob(payload: CreateJobPayload) {
  return this.http.post<{ message: string; job: Job }>(
    `${this.apiUrl}`,
    payload
  );
}


  // Get Job Applications
  getJobApplications(jobId: string): Observable<any> {
    return this.http.get<any>(
      `${environment.apiUrl}/applications/job/${jobId}`
    );
  }


  // Delete Job
  deleteJob(jobId: string): Observable<any> {
    return this.http.delete<any>(
      `${this.apiUrl}/${jobId}`
    );
  }


  // Save Job
  saveJob(jobId: string): Observable<any> {
    return this.http.post<any>(
      `${environment.apiUrl}/saved-jobs/${jobId}`,
      {}
    );
  }


  // Delete Saved Job
  deleteSavedJob(jobId: string): Observable<any> {
    return this.http.delete<any>(
      `${environment.apiUrl}/saved-jobs/${jobId}`
    );
  }

}