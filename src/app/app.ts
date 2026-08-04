import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './shared/components/navbar/navbar';
import { About } from './features/about/about';
import { Home } from './features/home/home';
import { Footer } from './shared/components/footer/footer';
import { JobsHero } from './features/job/jobs-hero/jobs-hero';
import { Jobs } from './features/job/jobs/jobs';
import { Companies } from './features/companies/companies';
import { CompanyProfile } from './features/company-profile/company-profile';
import { Register } from './features/auth/register/register';
import { Login } from './features/auth/login/login';
import { ForgotPassword } from './features/auth/forgot-password/forgot-password';
import { NotFound } from './features/not-found/not-found';
import { AuthNavbar } from './features/auth-navbar/auth-navbar';
import { Layout } from './features/- candidate-dashboard/layout/layout';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,Navbar,About,Home,Footer,JobsHero,Jobs,Companies,CompanyProfile,
    Register,Login,ForgotPassword,NotFound,AuthNavbar
   , Layout,

  ],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App {
  protected readonly title = signal('HireFlow');
}
