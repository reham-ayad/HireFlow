import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { JobsFilter } from '../jobs-filter/jobs-filter';
@Component({
  selector: 'app-jobs-hero',
  imports: [JobsFilter],
  templateUrl: './jobs-hero.html',
  styleUrl: './jobs-hero.scss',
})
export class JobsHero {}
