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
  phone: string;
  job: string;
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
  username: string;
  phone: string;
  questions_count:number;
  id: number;
  answers_count:number;
  questions?: Question[];
}

export interface Question{
  accepted_answer: string | null
  answers_count: number
  content: string
  created_at: string
  downvotes: number
  id: number
  upvotes: number
  user: User
  viewer_vote: string | null
 
}
export interface Notifications {
  data: string[]
  meta: Meta
  success: boolean
  unread_count: number
}

export interface Meta {
  current_page: number
  per_page: number
  total: number
}


export type QuestionFormData = {
  content: string;
};


export interface Answer {
  content: string;
  created_at: string;
  id: number;
  question_id: number;
  user: User;
  viewer_vote: string | null;
  downvotes: number;
  upvotes: number;
}

