import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Question, QuestionOption, ScreeningData, GreetingMessage } from '../types';
import {
  fetchScreeningData,
  generateQuestionId,
  generateOptionId,
} from '../services/screeningDataService';

interface ScreeningState {
  greetingMsg: GreetingMessage;
  questions: Question[];
  isLoading: boolean;
  isHydrated: boolean;
  error: string | null;
}

const initialState: ScreeningState = {
  greetingMsg: { text: '', options: [] },
  questions: [],
  isLoading: false,
  isHydrated: false,
  error: null,
};

// Async thunk for fetching screening data
export const fetchScreeningDataAsync = createAsyncThunk(
  'screening/fetchData',
  async () => {
    const data = await fetchScreeningData();
    return data;
  }
);

const screeningSlice = createSlice({
  name: 'screening',
  initialState,
  reducers: {
    setHydrated: (state) => {
      state.isHydrated = true;
    },
    updateQuestion: (state, action: PayloadAction<{ questionId: string; updates: Partial<Question> }>) => {
      const { questionId, updates } = action.payload;
      const questionIndex = state.questions.findIndex(q => q.id === questionId);
      if (questionIndex !== -1) {
        state.questions[questionIndex] = { ...state.questions[questionIndex], ...updates };
      }
    },
    addQuestion: (state, action: PayloadAction<{ afterQuestionId?: string }>) => {
      const { afterQuestionId } = action.payload;
      const questionId = generateQuestionId();
      const newQuestion: Question = {
        id: questionId,
        type: 'single-choice',
        title: 'Untitled Question',
        options: [
          { id: generateOptionId(questionId), text: 'Option 1', score: 0 },
          { id: generateOptionId(questionId), text: 'Option 2', score: 0 },
        ],
        disqualifier: false,
        enableScoring: false,
      };

      if (afterQuestionId) {
        const insertIndex = state.questions.findIndex(q => q.id === afterQuestionId) + 1;
        state.questions.splice(insertIndex, 0, newQuestion);
      } else {
        state.questions.push(newQuestion);
      }
    },
    deleteQuestion: (state, action: PayloadAction<string>) => {
      state.questions = state.questions.filter(q => q.id !== action.payload);
    },
    addOption: (state, action: PayloadAction<string>) => {
      const questionId = action.payload;
      const question = state.questions.find(q => q.id === questionId);
      if (question) {
        const newOption: QuestionOption = {
          id: generateOptionId(questionId),
          text: `Option ${(question.options?.length || 0) + 1}`,
          score: 0,
        };
        question.options = [...(question.options || []), newOption];
      }
    },
    deleteOption: (state, action: PayloadAction<{ questionId: string; optionId: string }>) => {
      const { questionId, optionId } = action.payload;
      const question = state.questions.find(q => q.id === questionId);
      if (question) {
        question.options = question.options?.filter(opt => opt.id !== optionId) || [];
      }
    },
    updateOption: (state, action: PayloadAction<{ questionId: string; optionId: string; updates: Partial<QuestionOption> }>) => {
      const { questionId, optionId, updates } = action.payload;
      const question = state.questions.find(q => q.id === questionId);
      if (question && question.options) {
        const optionIndex = question.options.findIndex(opt => opt.id === optionId);
        if (optionIndex !== -1) {
          question.options[optionIndex] = { ...question.options[optionIndex], ...updates };
        }
      }
    },
    selectOption: (state, action: PayloadAction<{ questionId: string; optionId: string }>) => {
      const { questionId, optionId } = action.payload;
      const question = state.questions.find(q => q.id === questionId);
      if (question && question.options) {
        if (question.type === 'single-choice') {
          // Single choice: deselect all, then select the clicked one
          question.options.forEach(opt => {
            opt.selected = opt.id === optionId;
          });
        } else if (question.type === 'multiple-choice') {
          // Multiple choice: toggle the clicked option
          const option = question.options.find(opt => opt.id === optionId);
          if (option) {
            option.selected = !option.selected;
          }
        }
      }
    },
    setAnswer: (state, action: PayloadAction<{ questionId: string; answer: string }>) => {
      const { questionId, answer } = action.payload;
      const question = state.questions.find(q => q.id === questionId);
      if (question) {
        question.answer = answer;
      }
    },
    reorderQuestions: (state, action: PayloadAction<{ dragIndex: number; dropIndex: number }>) => {
      const { dragIndex, dropIndex } = action.payload;
      const [draggedQuestion] = state.questions.splice(dragIndex, 1);
      state.questions.splice(dropIndex, 0, draggedQuestion);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchScreeningDataAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchScreeningDataAsync.fulfilled, (state, action: PayloadAction<ScreeningData>) => {
        state.isLoading = false;
        state.greetingMsg = action.payload.greeting_msg;
        state.questions = action.payload.questions;
      })
      .addCase(fetchScreeningDataAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch screening data';
      });
  },
});

export const {
  setHydrated,
  updateQuestion,
  addQuestion,
  deleteQuestion,
  addOption,
  deleteOption,
  updateOption,
  selectOption,
  setAnswer,
  reorderQuestions,
} = screeningSlice.actions;

export default screeningSlice.reducer;

