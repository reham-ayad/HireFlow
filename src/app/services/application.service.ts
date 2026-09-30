import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Application } from '../models/application.model';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  private http = inject(HttpClient);

  private readonly apiUrl =
    'https://hireflow-backend-one.vercel.app/api/applications';


  // =========================
  // Get My Applications
  // =========================

  getApplications(): Observable<Application[]> {

    return this.http.get<Application[]>(
      this.apiUrl
    );

  }


  // =========================
  // Add Application
  // =========================

  addApplication(
    jobId: string
  ): Observable<Application> {

    return this.http.post<Application>(
      this.apiUrl,
      {
        jobId
      }
    );

  }


  // =========================
  // Check Applied
  // =========================

  hasApplied(
    jobId: string
  ): Observable<boolean> {

    return this.http.get<boolean>(
      `${this.apiUrl}/check/${jobId}`
    );

  }


  // =========================
  // Get Application By Job
  // =========================

  getApplicationByJobId(
    jobId: string
  ): Observable<Application | null> {

    return this.http.get<Application | null>(
      `${this.apiUrl}/job/${jobId}`
    );

  }

}