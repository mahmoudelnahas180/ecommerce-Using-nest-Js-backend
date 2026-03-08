export interface IUsers {
  id: string;
  username: string;
  email: string;
  password: string;
  age?: number;
  role: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
  phoneNumber?: string;
  address?: string;
  active?: boolean;
  vervactionCode?: string;
  gender?: string;
}

export interface ICreateUser {
  username: string;
  email: string;
  password: string;
  age?: number;
  role: string;
  avatar?: string;
  phoneNumber?: string;
  address?: string;
  active?: boolean;
  vervactionCode?: string;
  gender?: string;
}

export interface ICreateUserResponse {}
