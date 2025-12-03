export type QuestionType = 'single-choice' | 'multiple-choice' | 'free-text' | 'single' | 'multiple' | 'free_text';

export interface QuestionOption {
  id?: string;
  text?: string;
  value?: string;
  score?: number;
}

export interface Question {
  id?: string;
  type: QuestionType;
  title?: string;
  question?: string;
  options?: QuestionOption[];
  score?: number; // Disabled for free-text questions
  disqualifier?: boolean;
  enableScoring?: boolean;
}

// New types for the screening data structure
export interface GreetingMessage {
  text: string;
  options: string[];
}

export interface ScreeningData {
  greeting_msg: GreetingMessage;
  questions: Question[];
}

export interface QuestionCardProps {
  question: Question;
  index: number;
  onQuestionUpdate: (questionId: string, updates: Partial<Question>) => void;
  onAddQuestion: (afterQuestionId: string) => void;
  onDeleteQuestion: (questionId: string) => void;
  onAddOption?: (questionId: string) => void;
  onDeleteOption?: (questionId: string, optionId: string) => void;
  onUpdateOption?: (questionId: string, optionId: string, updates: Partial<QuestionOption>) => void;
  onDragStart?: (e: React.DragEvent, index: number) => void;
  onDragOver?: (e: React.DragEvent, index: number) => void;
  onDrop?: (e: React.DragEvent, index: number) => void;
  onDragEnd?: (e: React.DragEvent) => void;
  isDragging?: boolean;
  dragOverIndex?: number | null;
}

export interface AddQuestionButtonProps {
  onAddQuestion: () => void;
}

