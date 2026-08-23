import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.scss'
})
export class contact {

  contactForm: FormGroup;

  constructor(private fb: FormBuilder) {

    this.contactForm = this.fb.group({
      firstName: ['', Validators.required],

      lastName: ['', Validators.required],

      email: [
        '',
        [
          Validators.required,
          Validators.email
        ]
      ],

      subject: [
        'Executive Recruitment Inquiry',
        Validators.required
      ],

      message: [
        '',
        Validators.required
      ]
    });

  }


  onSubmit(): void {

    if (this.contactForm.invalid) {

      this.contactForm.markAllAsTouched();

      return;
    }

    console.log('Contact Form:', this.contactForm.value);

    alert('Your message has been sent successfully!');

    this.contactForm.reset({
      firstName: '',
      lastName: '',
      email: '',
      subject: 'Executive Recruitment Inquiry',
      message: ''
    });
  }

}