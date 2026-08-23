import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterLink, RouterLinkActive } from '@angular/router';
@Component({
  selector: 'app-forgot-password',
  imports: [ RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.scss',
})
export class ForgotPassword {}
