
import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute,Router } from '@angular/router';
import {
  CompanyService,
  Company,
} from '../../services/company.service';

@Component({
  selector: 'app-company-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './company-profile.html',
  styleUrl: './company-profile.scss',
})
export class CompanyProfile implements OnInit {
  private route = inject(ActivatedRoute);
  private companyService = inject(CompanyService);
  private cdr = inject(ChangeDetectorRef);
  private router=inject(Router)

  company: Company | null = null;
  jobs: any[] = [];
  loading = true;
  errorMessage = '';

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      this.errorMessage = 'Company ID not found';
      this.loading = false;
      return;
    }

    this.companyService.getCompanyById(id).subscribe({
      next: (response) => {
        console.log('Full response:', response);

        this.company = response.company;
        this.jobs = response.jobs ?? [];
        this.loading = false;

        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error loading company:', error);
        this.errorMessage = 'Failed to load company profile.';
        this.loading = false;
        this.cdr.detectChanges();
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