import { Component } from '@angular/core';




interface Experience {
  position: string;
  company: string;
  type: string;
  date: string;
  description: string;
}

interface Education {
  degree: string;
  institution: string;
  date: string;
}

@Component({
  selector: 'app-my-profile',
  standalone: true,
  imports: [],
  templateUrl: './my-profile.html',
  styleUrl: './my-profile.scss',
})
export class ProfileComponent {

  expertise: string[] = [
    'User Research',
    'Product Strategy',
    'UI Design',
    'Prototyping',
    'Design Systems',
    'Frontend Logic',
    'Bento Grids',
    'Art Direction'
  ];


  experiences: Experience[] = [

    {
      position: 'Senior Product Designer',
      company: 'Techflow Global',
      type: 'Full-time',
      date: 'Jan 2021 — Present',
      description:
        'Leading the redesign of the core recruitment platform, focusing on AI-driven matching algorithms and high-conversion landing pages. Managed a team of 4 junior designers and collaborated directly with the CPO to define the product roadmap.'
    },

    {
      position: 'UI/UX Designer',
      company: 'Stripe Labs',
      type: 'Contract',
      date: 'Mar 2018 — Dec 2020',
      description:
        'Designed internal tooling for transaction monitoring and global financial reporting. Implemented a unified design system that reduced production time for engineering teams by 40%.'
    },

    {
      position: 'Junior Designer',
      company: 'Creative Nexus',
      type: 'Full-time',
      date: 'Jun 2015 — Feb 2018',
      description:
        'Supported senior staff in client presentations and interactive prototyping. Developed high-fidelity mockups for over 20 unique brand identities in the tech and hospitality sectors.'
    }

  ];


  educationList: Education[] = [

    {
      degree: 'MA in Digital Media Arts',
      institution: 'Royal College of Art',
      date: '2013 — 2015'
    },

    {
      degree: 'BSc in Interface Engineering',
      institution: 'Imperial College London',
      date: '2009 — 2013'
    }

  ];


  editProfile(): void {

    console.log('Edit profile clicked');

    // بعدين ممكن نعمل:
    // this.router.navigate(['/profile/edit']);

  }


  addExperience(): void {

    console.log('Add experience clicked');

    // بعدين ممكن تفتحي modal
    // أو تروحي لصفحة Add Experience

  }


  uploadResume(): void {

    const input =
      document.querySelector<HTMLInputElement>(
        'input[type="file"]'
      );

    input?.click();

  }


  onResumeSelected(event: Event): void {

    const input =
      event.target as HTMLInputElement;

    const file = input.files?.[0];

    if (!file) {
      return;
    }

    console.log('Selected resume:', file);

    alert(
      `Resume "${file.name}" selected successfully.`
    );

  }


  downloadResume(): void {

    console.log('Downloading resume...');

    // لو الـ PDF موجود في assets:
    //
    // const link = document.createElement('a');
    // link.href = 'assets/files/Sterling_Resume_2024.pdf';
    // link.download = 'Sterling_Resume_2024.pdf';
    // link.click();

  }

}