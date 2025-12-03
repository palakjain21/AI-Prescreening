import type { Question, QuestionOption, ScreeningData, QuestionType } from '../types';
import screeningDataJson from '../data/screening-data.json';

// API endpoint for fetching screening data
const API_ENDPOINT = 'https://www.jsonkeeper.com/b/RIO0F';


/**
 * Normalizes question type from JSON format to component format
 */
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

/**
 * Denormalizes question type from component format to JSON format
 */
function denormalizeQuestionType(type: Question['type']): string {
  switch (type) {
    case 'single-choice':
      return 'single';
    case 'multiple-choice':
      return 'multiple';
    case 'free-text':
      return 'free_text';
    default:
      return type;
  }
}

/**
 * Simplified ID masking function for screening data
 * Adds unique IDs to questions and options for component management
 */
export function maskScreeningData(rawData: typeof screeningDataJson): ScreeningData {
  const maskedQuestions: Question[] = rawData.questions.map((q, qIndex) => {
    // Simple ID generation using index
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
      enableScoring: true,
    };
  });

  return {
    greeting_msg: rawData.greeting_msg,
    questions: maskedQuestions,
  };
}


/**
 * Generates a new unique ID for a question
 * Used when creating new questions
 */
export function generateQuestionId(): string {
  return `q-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Generates a new unique ID for an option
 * Used when creating new options
 */
export function generateOptionId(questionId: string): string {
  return `${questionId}-opt-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Fetches screening data from API endpoint
 */
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
    // Fallback to local data
    return maskScreeningData(screeningDataJson);
  }
}

/**
 * Loads and masks the screening data from JSON (fallback/local data)
 */
export function loadScreeningData(): ScreeningData {
  return maskScreeningData(screeningDataJson);
}

