export type ApplicationStatus =
  | 'Pending'
  | 'Interviewing'
  | 'Accepted'
  | 'Rejected';

export interface ApplicationCompany {
  _id: string;
  name: string;
}

export interface ApplicationJob {
  _id: string;
  title: string;
  company: ApplicationCompany;
}

export interface Application {
  _id: string;

  user: string;

  job: ApplicationJob;

  fullName: string;
  email: string;
  phone: string;
  location: string;

  jobTitle: string;
  skills: string[];

  resume: string;
  coverLetter: string;

  status: ApplicationStatus;

  createdAt: string;
  updatedAt: string;
}