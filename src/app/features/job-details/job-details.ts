
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

interface SimilarJob {
  title: string;
  company: string;
  location: string;
  icon: string;
}

@Component({
  selector: 'app-job-details',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './job-details.html',
  styleUrl: './job-details.scss'
})
export class JobDetails {

  isSaved = false;

  alertForm: FormGroup;

  responsibilities: string[] = [
    'Collaborate with cross-functional teams to define and implement innovative solutions for the product direction, visuals, and experience.',

    'Execute all visual design stages from concept to final hand-off to engineering.',

    'Conceptualize original ideas that bring simplicity and user friendliness to complex design roadblocks.'
  ];

  qualifications: string[] = [
    '5+ years of experience as a Product Designer, preferably in B2B SaaS or Fintech.',

    'Strong portfolio showcasing high-end UI design, design systems work, and complex UX case studies.',

    'Expert proficiency in Figma, including advanced components, auto-layout, and prototyping.'
  ];

  similarJobs: SimilarJob[] = [
    {
      title: 'Visual Designer',
      company: 'Stripe',
      location: 'Remote',
      icon: '✣'
    },

    {
      title: 'Design Systems Lead',
      company: 'Linear',
      location: 'SF',
      icon: '◇'
    },

    {
      title: 'Brand Designer',
      company: 'Vercel',
      location: 'NY',
      icon: '◉'
    }
  ];


  constructor(private fb: FormBuilder) {

    this.alertForm = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.email
        ]
      ]
    });

  }


  applyNow(): void {

    console.log('Apply button clicked');

    // هنا بعدين ممكن توديه لصفحة الـ application
    // this.router.navigate(['/jobs/apply']);

  }


  toggleSave(): void {

    this.isSaved = !this.isSaved;

    console.log(
      this.isSaved
        ? 'Job saved'
        : 'Job removed from saved jobs'
    );

  }


  selectJob(job: SimilarJob): void {

    console.log('Selected job:', job);

    // بعدين ممكن نعمل routing للـ job details
    // this.router.navigate(['/jobs', job.id]);

  }


  subscribe(): void {

    if (this.alertForm.invalid) {

      this.alertForm.markAllAsTouched();

      return;
    }

    console.log(
      'Subscribed email:',
      this.alertForm.value.email
    );

    alert(
      `You'll receive new Design job alerts at ${this.alertForm.value.email}`
    );

    this.alertForm.reset();

  }

}