import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';

import {
  AdzunaResponse,
  AdzunaJob
} from '../../models/job.model';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  private http = inject(HttpClient);

  private readonly apiUrl =
    'https://api.adzuna.com/v1/api/jobs/us/search/1';

  private readonly fallbackUrl = '/data/jobs.json';

  private readonly appId = 'eaefafc1';

  private readonly appKey =
    '118f58de913216586f1a5fa959b069d4';

  private mapLocalJobToAdzunaJob(job: any): AdzunaJob {
    const salary = this.parseSalary(job.salary);

    return {
      id: String(job.id ?? crypto.randomUUID()),
      title: job.title ?? 'Untitled Role',
      description: job.description ?? 'No description available',
      company: {
        display_name: job.companyName ?? job.company?.name ?? 'Unknown Company'
      },
      location: {
        display_name: job.location ?? 'Unknown Location'
      },
      salary_min: salary.min,
      salary_max: salary.max,
      created: job.postedAt ?? new Date().toISOString(),
      category: {
        label: job.category ?? 'General',
        tag: job.category ?? 'general'
      },
      redirect_url: job.redirectUrl ?? '#'
    };
  }

  private parseSalary(salary?: string): { min?: number; max?: number } {
    if (!salary || typeof salary !== 'string') {
      return {};
    }

    const matches = salary.match(/\$?\s*(\d+(?:,\d{3})*(?:\.\d+)?)\s*(?:-|to)\s*\$?\s*(\d+(?:,\d{3})*(?:\.\d+)?)/i);

    if (matches) {
      const min = Number(matches[1].replace(/,/g, ''));
      const max = Number(matches[2].replace(/,/g, ''));
      return { min, max };
    }

    const singleMatch = salary.match(/\$?\s*(\d+(?:,\d{3})*(?:\.\d+)?)/i);

    if (singleMatch) {
      return { min: Number(singleMatch[1].replace(/,/g, '')) };
    }

    return {};
  }

  // =========================
  // Get All Jobs
  // =========================

  getJobs(): Observable<AdzunaResponse> {

    const params = {
      app_id: this.appId,
      app_key: this.appKey,
      what: 'backend developer',
      results_per_page: 20
    };

    return this.http.get<AdzunaResponse>(
      this.apiUrl,
      { params }
    ).pipe(
      catchError(() =>
        this.http.get<any[]>(this.fallbackUrl).pipe(
          map((jobs) => ({
            count: jobs.length,
            mean: 0,
            results: jobs.map(job => this.mapLocalJobToAdzunaJob(job))
          }))
        )
      )
    );
  }


  // =========================
  // Get Job By ID
  // =========================

  getJobById(id: string): Observable<AdzunaJob | undefined> {

    return this.getJobs().pipe(

      map(response =>

        response.results.find(
          job => job.id === id
        )

      )

    );
  }

}