import { Component } from '@angular/core';

@Component({
  selector: 'app-companies',
  imports: [],
  templateUrl: './companies.html',
  styleUrl: './companies.scss',
})
export class Companies {

companies = [
  {
    id: 1,
    name: 'NexGen Systems',
    logo: 'assets/images/company1.png',
    industry: 'Cloud Infrastructure',
    size: '501-1000 employees',
    description:
      'Architecting the future of distributed computing with a focus on sustainability and extreme-scale reliability.',
    jobs: 12,
    featured: true,
  },

  {
    id: 2,
    name: 'Lumina Creative',
    logo: 'assets/images/company2.png',
    industry: 'Design Agency',
    size: '11-50 employees',
    description:
      'A global design collective crafting digital experiences for brands that define culture.',
    jobs: 8,
    featured: false,
  },
{
  id: 3,
  name: 'Aurelius Capital',
  logo: 'assets/images/company3.png',
  industry: 'FinTech',
  size: '51-200 employees',
  description:
    'Reimagining private wealth management through AI-driven insights and transparent financial solutions.',
  jobs: 4,
  featured: false,
},
{
  id: 4,
  name: 'BioSynthetix',
  logo: 'assets/images/company4.png',
  industry: 'Healthcare',
  size: '201-500 employees',
  description:
    'Building the future of regenerative medicine with cutting-edge biotechnology and medical research.',
  jobs: 21,
  featured: false,
},
{
  id: 5,
  name: 'Vertex Structures',
  logo: 'assets/images/company5.png',
  industry: 'Architecture',
  size: '51-200 employees',
  description:
    'Designing sustainable urban spaces and modern architectural solutions for tomorrow’s cities.',
  jobs: 3,
  featured: false,
},
{
  id: 6,
  name: 'Aether Motors',
  logo: 'assets/images/company6.png',
  industry: 'Automotive',
  size: '1000+ employees',
  description:
    'Accelerating the future of electric mobility with intelligent engineering and autonomous technologies.',
  jobs: 45,
  featured: true,
},
{
  id: 7,
  name: 'Quantum Labs',
  logo: 'assets/images/company7.png',
  industry: 'Artificial Intelligence',
  size: '200-500 employees',
  description:
    'Developing next-generation AI systems that empower businesses through automation and predictive analytics.',
  jobs: 18,
  featured: false,
},
{
  id: 8,
  name: 'SkyBridge Cloud',
  logo: 'assets/images/company8.png',
  industry: 'Cloud Computing',
  size: '500-1000 employees',
  description:
    'Providing secure cloud infrastructure and enterprise-scale solutions for global organizations.',
  jobs: 14,
  featured: false,
},
{
  id: 9,
  name: 'Nova Commerce',
  logo: 'assets/images/company9.png',
  industry: 'E-Commerce',
  size: '100-300 employees',
  description:
    'Transforming online retail experiences with personalized shopping and AI-powered recommendations.',
  jobs: 11,
  featured: false,
},
{
  id: 10,
  name: 'PixelCraft Studio',
  logo: 'assets/images/company10.png',
  industry: 'Design Agency',
  size: '20-80 employees',
  description:
    'Creating exceptional digital products, brand identities, and user experiences for ambitious startups.',
  jobs: 7,
  featured: false,
},
{
  id: 11,
  name: 'GreenCore Energy',
  logo: 'assets/images/company11.png',
  industry: 'Renewable Energy',
  size: '500-1000 employees',
  description:
    'Delivering innovative renewable energy technologies to build a cleaner and more sustainable future.',
  jobs: 16,
  featured: true,
},
{
  id: 12,
  name: 'CyberShield',
  logo: 'assets/images/company12.png',
  industry: 'Cyber Security',
  size: '150-400 employees',
  description:
    'Protecting enterprises through advanced cybersecurity platforms and intelligent threat detection.',
  jobs: 23,
  featured: false,
}
];

  
}
