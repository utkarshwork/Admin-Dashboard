import { JSX } from "react";

export interface Data {
  id: string;
  name: string;
  email: string;
  phone: string;
  dob: string;
  status: string;
}

export interface HeadCell {
  id: keyof Data;
  label: string;
  numeric: boolean;
  disablePadding: boolean;
  render?: (row: Data) => JSX.Element;
}

export type UserData = {
  id: number;
  name: string;
  email: string;
  nric: string;
  uinfin: string;
  nonce: string;
  isAttempDate: string;
  perDayAttempt: number;
  isSubscribed: number;
  status: number;
  createdAt: string;
  updatedAt: string;
};
