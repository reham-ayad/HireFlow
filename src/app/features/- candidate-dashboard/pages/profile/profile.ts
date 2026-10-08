import {
  Component,
  inject,
  OnInit,
  PLATFORM_ID,
  ChangeDetectorRef
} from '@angular/core';
import { Router } from '@angular/router';
import {
  CommonModule,
  isPlatformBrowser
} from '@angular/common';

import { UserService, User } from '../../user.Service';

@Component({
  selector: 'app-profile',
  imports: [CommonModule],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile implements OnInit {

  private cdr = inject(ChangeDetectorRef);
  private platformId = inject(PLATFORM_ID);

  user: User = {} as User;

  loading = false;
  errorMessage = '';

  constructor(
    private userService: UserService,
        private router: Router

  ) {}



 
  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.getUserInfo();
  }

  getUserInfo(): void {
    this.loading = true;
    this.errorMessage = '';

    this.userService.getUserInfo().subscribe({
      next: (response) => {
        console.log('RESPONSE:', response);
        console.log('RESPONSE.USER:', response.user);
        console.log('NAME:', response.user?.name);

        this.user = response.user;

        console.log('THIS.USER:', this.user);
        console.log('THIS.USER.NAME:', this.user.name);

        this.loading = false;

        this.cdr.detectChanges();
      },

      error: (error) => {
        console.error('Get user profile error:', error);

        this.errorMessage =
          error.error?.message || 'Failed to load profile.';

        this.loading = false;

        this.cdr.detectChanges();
      },
    });
  }
  goToEditProfile(): void {
  console.log('CLICKED EDIT PROFILE');
  this.router.navigate(['/dashboard/edit-profile']);
}



}