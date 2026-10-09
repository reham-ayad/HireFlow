import { Component ,inject} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  private authService = inject(AuthService);
  private router = inject(Router);
  private snackBar=inject(MatSnackBar)
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
      this.snackBar.open(
        'Passwords do not match',
        'Close',
        {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top'

        }
      );
    
    console.log('Passwords do not match');
    return;
  }

  if (!this.registerData.acceptTerms) {
      this.snackBar.open(
        'Please accept the terms',
        'Close',
        {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top'

        }
      );
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

         this.snackBar.open(
        'Register successful:',
        'Close',
        {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top'

        }
      );
      console.log('Register successful:', response);
      this.router.navigate(['/']);
    },

    error: (error) => {
      console.log('Register failed:', error);
    }
  });
}

  

}