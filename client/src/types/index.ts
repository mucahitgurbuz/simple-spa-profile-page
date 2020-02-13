import { Photo } from "./../store/commonStore";

export interface CustomError {
  type: string;
  details?: ResponseDetail[];
}

export interface ResponseDetail {
  message: string;
}

export interface CustomError {
  type: string;
  details?: ResponseDetail[];
}

export interface Body {
  status: boolean;
  content: any;
  details?: ResponseDetail[];
}

export interface Company {
  id: number;
  title: string;
  logo: string;
  createdAt: string;
  updatedAt: string;
}

export interface Experience {
  id: number;
  position: string;
  createdAt: string;
  updatedAt: string;
  start: number;
  finish: number | null;
  ofId: number;
  description: number | null;
  location: string | null;
  companyId: number;
  company: Company;
}

export interface Education {
  id: number;
  institute: string;
  degree: string;
  department: string;
  gpa: string;
  start: number;
  finish: number;
  ofId: number;
  description: string;
  address: string;
  logo: string;
  createdAt: string;
  updatedAt: string;
}

export interface Skill {
  id: number;
  title: string;
  ofId: number;
  createdAt: string;
  updatedAt: string;
  endorsements: Endorsement[];
}

export interface Endorsement {
  id: number;
  skillId: number;
  endorsedId: number;
  createdAt: string;
  updatedAt: string;
  endorsedUsed: EndorsedUser[];
}

export interface EndorsedUser {
  displayName: string;
  email: string;
  fName: string;
  id: number;
  lName: string;
  photo: Photo;
}

export interface Award {
  createdAt: string;
  id: number;
  ofId: number;
  title: string;
  updatedAt: string;
}

export interface Publication {
  createdAt: string;
  updatedAt: string;
  id: number;
  ofId: number;
  title: string;
}

export interface Interest {
  createdAt: string;
  updatedAt: string;
  id: number;
  logo: string;
  memberCount: number;
  ofId: number;
  title: string;
}
