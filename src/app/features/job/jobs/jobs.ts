import { Component } from '@angular/core';

@Component({
  selector: 'app-jobs',
  imports: [],
  templateUrl: './jobs.html',
  styleUrl: './jobs.scss',
})
export class Jobs {
jobs = [
  {
    id: 1,
    title: 'Senior Product Designer',
    company: 'Linear',
    icon: 'fa-brands fa-figma',
    location: 'New York, NY',
    workMode: 'Remote',
    type: 'Full-time',
    level: 'Senior',
    featured: false,
    salary: '$180k – $240k',
    postedAt: '2 days ago',
    description: 'We\'re looking for a craft-focused designer to join our core product team. You will lead the design of our next-generation project management features, ensuring high-fidelity execution and a seamless user experience.'
  },
  {
    id: 2,
    title: 'Staff Backend Engineer',
    company: 'Stripe',
    icon: 'fa-brands fa-stripe',
    location: 'San Francisco, CA',
    workMode: 'Hybrid',
    type: 'Full-time',
    level: 'Senior',
    featured: true,
    salary: '$210k – $280k',
    postedAt: '5 days ago',
    description: 'Lead the architectural evolution of our global payments infrastructure, focusing on reliability, scalability and performance.'
  },
  {
    id: 3,
    title: 'VP of Engineering',
    company: 'Solaris',
    icon: 'fa-solid fa-building',
    location: 'London, UK',
    workMode: 'On-site',
    type: 'Full-time',
    level: 'Executive',
    featured: false,
    salary: '$250k – $350k',
    postedAt: '3 days ago',
    description: 'Scaling an engineering organization from 20 to 100+. You will build the technical vision, manage multiple squads and work closely with the CEO.'
  }
];

}