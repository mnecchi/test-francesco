export type Answer = {
  id: string;
  text: string;
};

export type Question = {
  id: string;
  text: string;
  answers: Answer[];
};

export type Questions = Question[];

export type UserAnswers = { [questionId: string]: string };
