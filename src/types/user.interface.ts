import { Document } from "mongoose";

export interface User {
  email: string;
  fullName: string;
  password: string;
  contactNumber: string;
  birthDate: string;
  createdAt: Date;
}

export interface UserDocument extends User, Document {
  validatePassword(param1: string): Promise<boolean>;
}
