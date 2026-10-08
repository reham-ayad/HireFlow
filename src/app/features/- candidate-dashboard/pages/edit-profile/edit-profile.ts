import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import {
UserService,
User,
UpdateProfileData
} from '../../user.Service';

@Component({
selector: 'app-edit-profile',
imports: [FormsModule],
templateUrl: './edit-profile.html',
styleUrl: './edit-profile.scss',
})
export class EditProfile implements OnInit {

user: User = {} as User;

loading = false;
saving = false;
errorMessage = '';
successMessage = '';

newSkill = '';

constructor(
private userService: UserService,
private router: Router
) {}

ngOnInit(): void {
this.getUserInfo();
}

// =========================
// Get User Profile
// =========================

getUserInfo(): void {
this.loading = true;
this.errorMessage = '';

this.userService.getUserInfo().subscribe({
  next: (response) => {
    this.user = response.user;

    // Make sure skills is always an array
    if (!this.user.skills) {
      this.user.skills = [];
    }

    this.loading = false;

    console.log('Edit Profile User:', this.user);
  },

  error: (error) => {
    console.error('Get profile error:', error);

    this.errorMessage =
      error.error?.message || 'Failed to load profile.';

    this.loading = false;
  },
});

}

// =========================
// Add Skill
// =========================

addSkill(): void {
const skill = this.newSkill.trim();

if (!skill) {
  return;
}

if (!this.user.skills) {
  this.user.skills = [];
}

const exists = this.user.skills.some(
  (item) => item.toLowerCase() === skill.toLowerCase()
);

if (!exists) {
  this.user.skills.push(skill);
}

this.newSkill = '';

}

// =========================
// Remove Skill
// =========================

removeSkill(index: number): void {
if (!this.user.skills) {
return;
}


this.user.skills.splice(index, 1);


}

// =========================
// Save Profile
// =========================

saveProfile(): void {
this.saving = true;
this.errorMessage = '';
this.successMessage = '';


const data: UpdateProfileData = {
  fullName: this.user.name,
  phone: this.user.phone,
  location: this.user.location,
  jobTitle: this.user.jobTitle,
  bio: this.user.bio,
  skills: this.user.skills || [],
};

console.log('Update Data:', data);

this.userService.updateProfile(data).subscribe({
  next: (response) => {
    console.log('Profile Updated:', response);

    this.user = response;

    this.saving = false;
    this.successMessage = 'Profile updated successfully.';

    // Optional: go back to profile after saving
    setTimeout(() => {
      this.router.navigate(['/profile']);
    }, 800);
  },

  error: (error) => {
    console.error('Update profile error:', error);

    this.errorMessage =
      error.error?.message || 'Failed to update profile.';

    this.saving = false;
  },
});


}

// =========================
// Cancel
// =========================

cancel(): void {
  console.log("SSSSSSSSSSSSSSSSSssss")
this.router.navigate(['/dashboard/profile']);
}
}
