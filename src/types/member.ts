export interface Member {
  id: number;
  name: string;
  yearStartAt: number;
  yearEndAt: number;
  medal: boolean;
  image: string | null;
  next: number;
  monthDeath: string;
  city: string;
  calledUponDate: string;
  howDie: string;
  placeDeath: string | null;
  ranks: string | null;
}
