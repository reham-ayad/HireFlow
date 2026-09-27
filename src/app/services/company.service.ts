import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private http = inject(HttpClient);

  private readonly apiUrl =
    'https://hireflow-backend-one.vercel.app/api/companies';

  getCompanies(): Observable<CompaniesResponse> {
    return this.http.get<CompaniesResponse>(this.apiUrl);
  }

  getCompanyById(id: string): Observable<Company> {
    return this.http.get<Company>(`${this.apiUrl}/${id}`);
  }
}