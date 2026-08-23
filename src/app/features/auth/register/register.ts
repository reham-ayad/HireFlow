import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {

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

    console.log('Register Data:', {
      ...this.registerData,
      role: this.selectedRole
    });

  }

}