import type { Question, QuestionOption, ScreeningData } from '../types';
import screeningDataJson from '../data/screening-data.json';

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

export function maskScreeningData(rawData: typeof screeningDataJson): ScreeningData {
  const maskedQuestions: Question[] = rawData.questions.map((q, qIndex) => {
    const questionId = `q_${qIndex}`;
    
    const maskedOptions: QuestionOption[] = (q.options || []).map((opt, optIndex) => ({
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
      enableScoring: q.options?.length > 0 && q.options.every(opt => opt.score !== undefined) || false,
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

export async function fetchScreeningData(): Promise<ScreeningData> {
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
  return maskScreeningData(screeningDataJson);
}

