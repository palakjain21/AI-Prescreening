import React, { useState, useEffect, useCallback } from 'react';
import { QuestionCard, AddQuestionButton } from './QuestionCard';
import { Card, CardContent, Button, GreetingMessage, EndingMessage } from './index';
import type { Question, QuestionOption, ScreeningData } from '../types';
import {
  loadScreeningData,
  fetchScreeningData,
  generateQuestionId,
  generateOptionId,
} from '../services/screeningDataService';

const ScreeningQuestions: React.FC = () => {
  // Initialize with local data first, then fetch from API
  const [screeningData, setScreeningData] = useState<ScreeningData>(() => loadScreeningData());
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  useEffect(() => {
    // Fetch data from API on component mount
    const initializeData = async () => {
      setIsLoading(true);
      try {
        const apiData = await fetchScreeningData();
        setScreeningData(apiData);
        setQuestions(apiData.questions);
      } catch (error) {
        console.error('Failed to initialize screening data:', error);
        // Fallback to local data if API fails
        const localData = loadScreeningData();
        setScreeningData(localData);
        setQuestions(localData.questions);
      } finally {
        setIsLoading(false);
      }
    };

    initializeData();
  }, []);

  useEffect(() => {
    // Sync questions with screeningData when it changes
    // This ensures questions stay in sync, especially on initial load
    setQuestions(screeningData.questions);
  }, [screeningData]);

  const updateJsonData = (updatedQuestions: Question[]) => {
    const updatedScreeningData: ScreeningData = {
      ...screeningData,
      questions: updatedQuestions,
    };
    setScreeningData(updatedScreeningData);
  };

  const handleQuestionUpdate = (questionId: string, updates: Partial<Question>) => {
    const updatedQuestions = questions.map(q =>
      q.id === questionId ? { ...q, ...updates } : q
    );
    setQuestions(updatedQuestions);
    updateJsonData(updatedQuestions);
  };

  const handleAddQuestion = (afterQuestionId?: string) => {
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
      enableScoring: true,
    };

    let updatedQuestions: Question[];
    if (afterQuestionId) {
      const insertIndex = questions.findIndex(q => q.id === afterQuestionId) + 1;
      updatedQuestions = [
        ...questions.slice(0, insertIndex),
        newQuestion,
        ...questions.slice(insertIndex),
      ];
    } else {
      updatedQuestions = [...questions, newQuestion];
    }

    setQuestions(updatedQuestions);
    updateJsonData(updatedQuestions);
  };

  const handleDeleteQuestion = (questionId: string) => {
    const updatedQuestions = questions.filter(q => q.id !== questionId);
    setQuestions(updatedQuestions);
    updateJsonData(updatedQuestions);
  };

  const handleAddOption = (questionId: string) => {
    const updatedQuestions = questions.map(q => {
      if (q.id === questionId) {
        const newOption: QuestionOption = {
          id: generateOptionId(questionId),
          text: `Option ${(q.options?.length || 0) + 1}`,
          score: 0,
        };
        return {
          ...q,
          options: [...(q.options || []), newOption],
        };
      }
      return q;
    });
    setQuestions(updatedQuestions);
    updateJsonData(updatedQuestions);
  };

  const handleDeleteOption = (questionId: string, optionId: string) => {
    const updatedQuestions = questions.map(q => {
      if (q.id === questionId) {
        return {
          ...q,
          options: q.options?.filter(opt => opt.id !== optionId) || [],
        };
      }
      return q;
    });
    setQuestions(updatedQuestions);
    updateJsonData(updatedQuestions);
  };

  const handleUpdateOption = (questionId: string, optionId: string, updates: Partial<QuestionOption>) => {
    const updatedQuestions = questions.map(q => {
      if (q.id === questionId) {
        return {
          ...q,
          options: q.options?.map(opt =>
            opt.id === optionId ? { ...opt, ...updates } : opt
          ) || [],
        };
      }
      return q;
    });
    setQuestions(updatedQuestions);
    updateJsonData(updatedQuestions);
  };

  const handleDragStart = useCallback((dragIndex: number) => {
    setDraggedIndex(dragIndex);
  }, []);

  const handleDragEnd = useCallback(() => {
    setDraggedIndex(null);
  }, []);

  const handleDrop = useCallback((dragIndex: number, dropIndex: number) => {
    const newQuestions = [...questions];
    const draggedQuestion = newQuestions[dragIndex];
    
    // Remove the dragged question from its original position
    newQuestions.splice(dragIndex, 1);
    
    // Insert it at the new position
    newQuestions.splice(dropIndex, 0, draggedQuestion);
    
    setQuestions(newQuestions);
    updateJsonData(newQuestions);
  }, [questions]);

  const handleHover = useCallback((_hoverIndex: number | null) => {
    // Currently just for visual feedback in individual cards
    // Can be extended for drop indicators between cards if needed
  }, []);

  // Show loading state while fetching data
  if (isLoading) {
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
      <div className="w-full flex items-center justify-between">
          <div className="fs-[15px] text-gray-900">Prescreening Chat</div>
          <Button variant="outline" className="fs-[15px] text-gray-900">
            Regenerate</Button>
      </div>

      {/* Greeting Message */}
      <Card variant="greeting" className="p-0 border-none"> 
        <CardContent className="p-0 border-none">
          {/* <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Welcome Text
              </label>
              <textarea
                value={screeningData.greeting_msg.text}
                onChange={(e) => setScreeningData({
                  ...screeningData,
                  greeting_msg: {
                    ...screeningData.greeting_msg,
                    text: e.target.value,
                  },
                })}
                className="w-full p-3 border border-gray-300 rounded-lg resize-none"
                rows={3}
              />
            </div>
            <div className='flex flex-wrap gap-2'>
              {screeningData?.greeting_msg?.options?.map((option) => (
                <Badge key={option} variant='outline'>{option}</Badge>
              ))}
            </div>  
          </div> */}
          <GreetingMessage
            message={screeningData.greeting_msg.text}
            buttonOptions={screeningData.greeting_msg.options}
          />
        </CardContent>
      </Card>

      <div className="space-y-4">
        
        {questions.map((question, index) => (
          <QuestionCard
            key={question.id}
            question={question}
            index={index}
            onQuestionUpdate={handleQuestionUpdate}
            onAddQuestion={handleAddQuestion}
            onDeleteQuestion={handleDeleteQuestion}
            onAddOption={handleAddOption}
            onDeleteOption={handleDeleteOption}
            onUpdateOption={handleUpdateOption}
            onDrop={handleDrop}
            onHover={handleHover}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            draggedIndex={draggedIndex}
          />
        ))}
        
        <AddQuestionButton onAddQuestion={() => handleAddQuestion()} />
            <EndingMessage />
      </div>
    </div>
  );
};

export default ScreeningQuestions;
