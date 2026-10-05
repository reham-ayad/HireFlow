import { Component ,inject} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from 'express';
import { RouterLink, RouterLinkActive } from '@angular/router';
@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  private authService = inject(AuthService);
  private router = inject(Router);
  // Password visibility
  showPassword = false;
  showConfirmPassword = false;

  // Selected role
  selectedRole: 'candidate' | 'employer' = 'candidate';

  // Form data
  registerData = {
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false
  };


  // Select role
  selectRole(role: 'candidate' | 'employer'): void {
    this.selectedRole = role;
  }


  // Register
register(): void {

  if (this.registerData.password !== this.registerData.confirmPassword) {
    console.log('Passwords do not match');
    return;
  }

  if (!this.registerData.acceptTerms) {
    console.log('Please accept the terms');
    return;
  }

  const data = {
    name: this.registerData.fullName,
    email: this.registerData.email,
    password: this.registerData.password,
    confirmPassword: this.registerData.confirmPassword,
    role: this.selectedRole
  };

  this.authService.register(data).subscribe({
    next: (response) => {

      console.log('Register successful:', response);
      this.router.navigate(['/']);
    },

    error: (error) => {
      console.log('Register failed:', error);
    }
  });
}

  

}