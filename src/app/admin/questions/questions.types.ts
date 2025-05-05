import { JSX } from "react";

export interface Question {
  id: number;
  question: string;
  type: string;
  status: number;
  sequence: number;
  createdAt: string | null;
  updatedAt: string | null;
  metas: AttemptMeta[];
}

export interface HeadCell {
  id: keyof Question;
  label: string;
  numeric: boolean;
  disablePadding: boolean;
  render?: (row: Question) => JSX.Element;
}

export interface AttemptQuestion {
  question: string;
  type: string;
  status: number;
  sequence: number;
  options: string[];
}
export type AttemptMeta = {
  id: number;
  questionId: number;
  option: string;
  createdAt: string;
  updatedAt: string;
  answers: unknown[];
};
export interface AttemptResponse {
  id: number;
  message?: string;
}
export interface UpdateQuestionPayload {
  question: string;
  type: "radio" | "checkbox";
  status: number;
  sequence: number;
  options: string[];
}

export interface UpdateQuestionResponse {
  success: boolean;
  message: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
}
