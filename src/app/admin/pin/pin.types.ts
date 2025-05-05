import { JSX } from "react";

export interface Data {
  id: string;
  pin: number;
  participant_id: string;
  used_date: string;
  status: number;
}

export interface HeadCell {
  id: keyof Data;
  pin: number;
  numeric: boolean;
  disablePadding: boolean;
  render?: (row: Data) => JSX.Element;
}
