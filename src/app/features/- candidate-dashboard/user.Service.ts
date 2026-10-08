import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {authInterceptor} from '../../interceptors/auth.interceptor';
export interface User {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  location?: string;
  jobTitle?: string;
  bio?: string;
  skills?: string[];
  role?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Application {
  _id: string;
  job: any;
  status: 'Pending' | 'Accepted' | 'Rejected';
  createdAt?: string;
}

export interface Company
 {
   _id: string; 
   name: string; logo?: string; }
    export interface Job {
     _id: string;
     title: string;
     company: Company;
     location: string;
     jobType: string;
     salary?: string;
     description?: string;
     requirements?: string[];
     createdAt?: string;
     updatedAt?: string;

    } export interface SavedJob { _id: string; user: string; job: Job; createdAt: string; updatedAt: string; } export interface SavedJobsResponse { savedJobs: SavedJob[]; }

export interface UpdateProfileData {
  fullName?: string;
  phone?: string;
  location?: string;
  bio?: string;
  jobTitle?: string;
  skills?: string[];
  profileImage?: string;
}

export interface ResetPasswordData {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export interface UserProfileResponse {
  user: User;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = environment.apiUrl ;
  constructor(private http: HttpClient) {}
user: any = null;

  // Get current user information
  getUserInfo(): Observable<UserProfileResponse> {
  return this.http.get<UserProfileResponse>(
    `${this.apiUrl}/users/profile`
  );
}
  // Get all user's applications
  // getUserApplications(): Observable<Application[]> {
  //   return this.http.get<Application[]>(`${this.apiUrl}/my-applications`);
  // }

  // Get all user's saved jobs
getUserSavedJobs(): Observable<SavedJobsResponse>
 { return this.http.get<SavedJobsResponse>( `${this.apiUrl}/saved-jobs` ); }

 deleteSavedJob(jobId: string): Observable<{ message: string }>
  { return this.http.delete<{ message: string }>( `${this.apiUrl}/saved-jobs/${jobId}` ); }

  // Update user profile information
  updateProfile(data: UpdateProfileData): Observable<User> {
    return this.http.put<User>(
      `${this.apiUrl}/profile`,
      data
    );
  }

  // Reset user password
  resetPassword(data: ResetPasswordData): Observable<any> {
    return this.http.put(
      `${this.apiUrl}/reset-password`,
      data
    );
  }
}