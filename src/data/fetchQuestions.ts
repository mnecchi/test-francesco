import questions from './questions.json';
import { Questions } from './types';

const fetchQuestions = async () => questions as Questions;

export default fetchQuestions;
