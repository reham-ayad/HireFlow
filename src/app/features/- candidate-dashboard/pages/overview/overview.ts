import { Component } from '@angular/core';
import { StatsCard } from '../../components/stats-card/stats-card';
import { JobCard } from '../../components/job-card/job-card';

@Component({
  selector: 'app-overview',
  imports: [StatsCard,JobCard],
  templateUrl: './overview.html',
  styleUrl: './overview.scss',
})
export class Overview {}
