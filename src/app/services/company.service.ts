import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Company {
  _id: string;
  name: string;
  logo: string;
  description: string;
  website: string;
  location: string;
  industry: string;
  employees: string;
  openPositions: number;
  createdAt: string;
  updatedAt: string;
}

export interface CompaniesResponse {
  companies: Company[];
}

export interface CompanyProfileResponse {
  company: Company;
  jobs: any[];
}

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private http = inject(HttpClient);

  private readonly apiUrl =
    environment.apiUrl+'/companies';

  getCompanies(): Observable<CompaniesResponse> {
    return this.http.get<CompaniesResponse>(this.apiUrl);
  }

 getCompanyById(id: string): Observable<CompanyProfileResponse> {
  return this.http.get<CompanyProfileResponse>(`${this.apiUrl}/${id}`);
}
}