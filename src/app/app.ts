import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './shared/components/navbar/navbar';
import { About } from './features/about/about';
import { Home } from './features/home/home';
import { Footer } from './shared/components/footer/footer';
import { JobsHero } from './features/job/jobs-hero/jobs-hero';
import { Jobs } from './features/job/jobs/jobs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,Navbar,About,Home,Footer,JobsHero,Jobs],
templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('HireFlow');
}
