export interface JwtPayload {
  exp: number;
  email?: string;
}

export interface Participant {
  id: number;
  name: string;
  email: string;
  nric: string;
  uinfin: string;
  nonce: string;
  isAttempDate: Date;
  perDayAttempt: number;
  is_subscribed: number;
  status: number;
  created_at: Date;
  updated_at: Date;
  attemptRemain: string;
}
