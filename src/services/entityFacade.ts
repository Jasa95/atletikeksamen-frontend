export interface Participant {
  id: number;
  name: string;
  age: number;
  gender: string;
  club: string;
  disciplineNames?: string[];
}

export interface Discipline {
  id: number;
  name: string;
  resultsType: string;
  participantNames?: string[];
}

export interface Result {
  id: number;
  participantId: number;
  disciplineId: number;
  date: string;
  resultType: string;
  resultValue: string;
}
