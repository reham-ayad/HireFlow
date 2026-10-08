
import {
  Component,
  inject,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  CompanyService,
  Company
} from '../../services/company.service';


@Component({
  selector: 'app-companies',

  imports: [
    CommonModule,
    FormsModule
  ],

  templateUrl: './companies.html',
  styleUrl: './companies.scss',
})


export class Companies implements OnInit {

  private companyService = inject(CompanyService);
  private cdr = inject(ChangeDetectorRef);


  companies: Company[] = [];

  filteredCompanies: Company[] = [];


  loading = true;

  errorMessage = '';


  // ================================
  // SEARCH & FILTERS
  // ================================

  searchTerm = '';

  selectedIndustry = '';

  selectedSize = '';


  // ================================
  // INIT
  // ================================

  ngOnInit(): void {

    this.loadCompanies();

  }


  // ================================
  // LOAD COMPANIES
  // ================================

  loadCompanies(): void {

    this.companyService.getCompanies().subscribe({

      next: (response) => {

        console.log(
          'COMPANIES API RESPONSE:',
          response
        );


        this.companies =
          response.companies ?? [];


        this.filteredCompanies =
          [...this.companies];


        console.log(
          'COMPANIES:',
          this.companies
        );


        this.loading = false;


        this.cdr.detectChanges();
      this.cdr.markForCheck();

      },


      error: (error) => {

        console.error(
          'FAILED TO LOAD COMPANIES:',
          error
        );


        this.errorMessage =
          'Failed to load companies. Please try again.';


        this.loading = false;

      }

    });

  }


  // ================================
  // SEARCH
  // ================================

  searchCompanies(): void {

    const search =
      this.searchTerm
        .trim()
        .toLowerCase();


    console.log(
      'SEARCH:',
      search
    );


    console.log(
      'INDUSTRY:',
      this.selectedIndustry
    );


    console.log(
      'SIZE:',
      this.selectedSize
    );


    this.filteredCompanies =
      this.companies.filter(company => {


        // ============================
        // SEARCH
        // ============================

        const matchesSearch =

          !search ||

          company.name
            ?.toLowerCase()
            .includes(search) ||

          company.description
            ?.toLowerCase()
            .includes(search) ||

          company.industry
            ?.toLowerCase()
            .includes(search);


        // ============================
        // INDUSTRY
        // ============================

        const matchesIndustry =

          !this.selectedIndustry ||

          company.industry ===
          this.selectedIndustry;


        // ============================
        // COMPANY SIZE
        // ============================

        const matchesSize =

          !this.selectedSize ||

          this.matchesCompanySize(
            company.employees,
            this.selectedSize
          );


        return (
          matchesSearch &&
          matchesIndustry &&
          matchesSize
        );

      });


    console.log(
      'FILTERED COMPANIES:',
      this.filteredCompanies
    );


    this.cdr.detectChanges();

  }


  // ================================
  // COMPANY SIZE
  // ================================

  matchesCompanySize(
    employees: string,
    selectedSize: string
  ): boolean {


    if (!employees) {

      return false;

    }


    // --------------------------------
    // Extract numbers
    // Example:
    // "50-100" -> [50, 100]
    // "500-1000" -> [500, 1000]
    // --------------------------------

    const numbers =
      employees.match(/\d+/g);


    if (!numbers) {

      return false;

    }


    const minEmployees =
      Number(numbers[0]);


    const maxEmployees =
      numbers.length > 1
        ? Number(numbers[1])
        : minEmployees;


    // ================================
    // SELECTED RANGE
    // ================================

    switch (selectedSize) {


      case '1-10':

        return maxEmployees >= 1 &&
               minEmployees <= 10;


      case '11-50':

        return maxEmployees >= 11 &&
               minEmployees <= 50;


      case '51-200':

        return maxEmployees >= 51 &&
               minEmployees <= 200;


      case '500+':

        return maxEmployees >= 500;


      default:

        return true;

    }

  }


  // ================================
  // CLEAR FILTERS
  // ================================

  clearFilters(): void {

    this.searchTerm = '';

    this.selectedIndustry = '';

    this.selectedSize = '';


    this.filteredCompanies =
      [...this.companies];

  }

}
