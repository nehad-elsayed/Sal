export interface LoginData {
  username: string;
  password: string;
}
export interface RegisterData {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  password: string;
}

export interface LoginResponse {
  status?: string;
  token: string;
}

export interface User {
  avatar: string;
  bio?: string;
  email: string;
  first_name: string;
  last_name: string;
  job: string;
  full_name: string;
  created_at: string;
  user_name: string;
  phone: string;
  id: number;
}
