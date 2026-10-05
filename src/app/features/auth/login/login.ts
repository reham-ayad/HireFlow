import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  ActivatedRoute
} from '@angular/router';

import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {

  private authService = inject(AuthService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  // Password visibility
  showPassword = false;

  // Login form data
  loginData = {
    email: '',
    password: ''
  };

  // Login
  login(): void {

    this.authService.login(this.loginData).subscribe({

      next: (response) => {

        console.log('Login successful:', response);

        // Check if user came from another page
        const returnUrl =
          this.route.snapshot.queryParamMap.get('returnUrl');

        if (returnUrl) {

          this.router.navigateByUrl(returnUrl);

        } else {

          // Normal login
          this.router.navigate(['/']);

        }

      },

      error: (error) => {

        console.log('Login failed:', error);

      }

    });
  }
}