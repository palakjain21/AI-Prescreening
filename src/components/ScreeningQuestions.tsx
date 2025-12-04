import React, { useState, useEffect, useCallback } from 'react';
import { QuestionCard, AddQuestionButton } from './QuestionCard';
import { Card, CardContent, Button, GreetingMessage, EndingMessage, AIIcon, Toast, Trash } from './index';
import type { Question, QuestionOption } from '../types';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  fetchScreeningDataAsync,
  setHydrated,
  updateQuestion,
  addQuestion,
  deleteQuestion,
  addOption,
  deleteOption,
  updateOption,
  reorderQuestions,
} from '../store/screeningSlice';

const ScreeningQuestions: React.FC = () => {
  const dispatch = useAppDispatch();
  const { greetingMsg, questions, isLoading, isHydrated } = useAppSelector(state => state.screening);
  
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [showToast, setShowToast] = useState<boolean>(false);

  useEffect(() => {
    // Only fetch data if not hydrated (no persisted data) or if questions are empty
    if (!isHydrated) {
      dispatch(setHydrated());
    }
    
    // Fetch from API only if there's no persisted data
    if (questions.length === 0) {
      dispatch(fetchScreeningDataAsync());
    }
  }, [dispatch, isHydrated, questions.length]);

  const handleQuestionUpdate = useCallback((questionId: string, updates: Partial<Question>) => {
    dispatch(updateQuestion({ questionId, updates }));
  }, [dispatch]);

  const handleAddQuestion = useCallback((afterQuestionId?: string) => {
    dispatch(addQuestion({ afterQuestionId }));
  }, [dispatch]);

  const handleDeleteQuestion = useCallback((questionId: string) => {
    dispatch(deleteQuestion(questionId));
    setShowToast(true);
  }, [dispatch]);

  const handleAddOption = useCallback((questionId: string) => {
    dispatch(addOption(questionId));
  }, [dispatch]);

  const handleDeleteOption = useCallback((questionId: string, optionId: string) => {
    dispatch(deleteOption({ questionId, optionId }));
  }, [dispatch]);

  const handleUpdateOption = useCallback((questionId: string, optionId: string, updates: Partial<QuestionOption>) => {
    dispatch(updateOption({ questionId, optionId, updates }));
  }, [dispatch]);

  const handleDragStart = useCallback((dragIndex: number) => {
    setDraggedIndex(dragIndex);
  }, []);

  const handleDragEnd = useCallback(() => {
    setDraggedIndex(null);
  }, []);

  const handleDrop = useCallback((dragIndex: number, dropIndex: number) => {
    dispatch(reorderQuestions({ dragIndex, dropIndex }));
  }, [dispatch]);

  // Show loading state while fetching data
  if (isLoading && questions.length === 0) {
    return (
      <div className="w-[800px] max-w-[800px] mx-auto p-6 space-y-6">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading screening questions...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-[800px] max-w-[800px] mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="w-full flex items-center justify-between border-b border-gray-200 pb-2">
          <div className="fs-[15px] text-gray-900">Prescreening Chat</div>
          <Button variant="outline" color='primary' className="fs-[15px] flex items-center gap-2">
            <AIIcon />
            Regenerate</Button>
      </div>

      {/* Greeting Message */}
      <Card variant="greeting" className="p-0 border-none"> 
        <CardContent className="p-0 border-none">
          <GreetingMessage
            message={greetingMsg.text}
            buttonOptions={greetingMsg.options}
          />
        </CardContent>
      </Card>

      <div className="space-y-4">
        
        {questions.map((question, index) => (
          <QuestionCard
            key={question.id}
            question={question}
            index={index}
            totalQuestions={questions.length}
            onQuestionUpdate={handleQuestionUpdate}
            onAddQuestion={handleAddQuestion}
            onDeleteQuestion={handleDeleteQuestion}
            onAddOption={handleAddOption}
            onDeleteOption={handleDeleteOption}
            onUpdateOption={handleUpdateOption}
            onDrop={handleDrop}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            draggedIndex={draggedIndex}
          />
        ))}
        
        <AddQuestionButton onAddQuestion={() => handleAddQuestion()} />
            <EndingMessage />
      </div>

      {/* Success Toast */}
      <Toast
        variant="error"
        open={showToast}
        onClose={() => setShowToast(false)}
        duration={2000}
        icon={<Trash />}
        title="Question Deleted"
        description="The question has been removed successfully"
      />
    </div>
  );
};

export default ScreeningQuestions;
