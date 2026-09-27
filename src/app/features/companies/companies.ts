
import { Component, OnInit, inject } from '@angular/core';
import { CompanyService, Company } from '../../services/company.service';

@Component({
  selector: 'app-companies',
  imports: [],
  templateUrl: './companies.html',
  styleUrl: './companies.scss',
})
export class Companies implements OnInit {

  private companyService = inject(CompanyService);

  companies: Company[] = [];

  loading = true;
  errorMessage = '';

  ngOnInit(): void {
    this.loadCompanies();
  }

  loadCompanies(): void {

    this.companyService.getCompanies().subscribe({

      next: (response) => {

        console.log('COMPANIES API RESPONSE:', response);

        this.companies = response.companies ?? [];

        console.log('COMPANIES:', this.companies);

        this.loading = false;
      },

      error: (error) => {

        console.error('FAILED TO LOAD COMPANIES:', error);

        this.errorMessage = 'Failed to load companies. Please try again.';

        this.loading = false;
      }

    });

  }

}
