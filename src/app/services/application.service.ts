import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Application } from '../models/application.model';
import { environment } from '../../environments/environment';

interface ApplicationsResponse {
  applications: Application[];
}

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  private http = inject(HttpClient);

  private readonly apiUrl = environment.apiUrl + '/applications';

  getApplications(): Observable<ApplicationsResponse> {
  return this.http.get<ApplicationsResponse>(
    `${this.apiUrl}/my-applications`
  );
}

  addApplication(
    jobId: string,
    data: {
      fullName: string;
      email: string;
      phone: string;
      location: string;
      jobTitle: string;
      skills: string[];
      resume: string;
      coverLetter: string;
    }
  ): Observable<Application> {

    return this.http.post<Application>(
      `${this.apiUrl}/${jobId}`,
      data
    );
  }

  hasApplied(jobId: string): Observable<boolean> {
    return this.http.get<boolean>(
      `${this.apiUrl}/check/${jobId}`
    );
  }

  getApplicationByJobId(
    jobId: string
  ): Observable<Application | null> {

    return this.http.get<Application | null>(
      `${this.apiUrl}/job/${jobId}`
    );
  }
}