export interface Election {
  id: number;
  title: string;
  description: string;
  start_time: Date;
  end_time: Date;
  isActive: boolean;
  candidates: Candidate[];
}

export interface Candidate {
  id: number;
  name: string;
  position: string;
  avatar: string;
  vote_count: number;
  title: string;
  year_enrolled: Date;
  graduation_year: Date;
  manifesto: string;
  votes: any[];
}
