import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-job-card',
   standalone: true,
  imports: [CommonModule],
 
  templateUrl: './job-card.html',
  styleUrl: './job-card.scss',
})
export class JobCard {


  @Input() title = '';

  @Input() company = '';

  @Input() location = '';

  @Input() type = '';

  @Input() salary = '';

  @Input() icon = '';

  @Input() skills:string[] = [];



}
