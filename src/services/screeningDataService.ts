import type { Question, QuestionOption, ScreeningData } from '../types';

const API_ENDPOINT = 'https://www.jsonkeeper.com/b/RIO0F';

function normalizeQuestionType(type: string): Question['type'] {
  switch (type) {
    case 'single':
      return 'single-choice';
    case 'multiple':
      return 'multiple-choice';
    case 'free_text':
      return 'free-text';
    default:
      return type as Question['type'];
  }
}

export function maskScreeningData(rawData: { questions: any[]; greeting_msg: any; }): ScreeningData {
  const maskedQuestions: Question[] = rawData.questions.map((q: { options: any[]; type: string; question: any; disqualifier: any; }, qIndex: any) => {
    const questionId = `q_${qIndex}`;
    
    const maskedOptions: QuestionOption[] = (q.options || []).map((opt: { value: any; score: any; }, optIndex: any) => ({
      id: `${questionId}_opt_${optIndex}`,
      text: opt.value || '',
      value: opt.value,
      score: opt.score || 0,
    }));

    return {
      id: questionId,
      type: normalizeQuestionType(q.type),
      title: q.question || '',
      question: q.question,
      options: maskedOptions,
      disqualifier: q.disqualifier || false,
      enableScoring: q.options?.length > 0 && q.options.every((opt: { score: undefined; }) => opt.score !== undefined) || false,
    };
  });

  return {
    greeting_msg: rawData.greeting_msg,
    questions: maskedQuestions,
  };
}

export function generateQuestionId(): string {
  return `q-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

export function generateOptionId(questionId: string): string {
  return `${questionId}-opt-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

export async function fetchScreeningData(){
  try {
    const response = await fetch(API_ENDPOINT);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const rawData = await response.json();
    return maskScreeningData(rawData);
  } catch (error) {
    console.error('Failed to fetch screening data from API:', error);
  }
}

