import * as React from "react";
import { useState } from "react";
import { Input, Button } from "./index";
import type { QuestionOption, Question } from "../types";

interface OptionRowProps {
  option: QuestionOption;
  index: number;
  questionType: Question['type'];
  enableScoring: boolean;
  onUpdateText: (text: string) => void;
  onUpdateScore: (score: number) => void;
  onDelete: () => void;
  canDelete: boolean;
}

export const OptionRow: React.FC<OptionRowProps> = ({
  option,
  index,
  questionType,
  enableScoring,
  onUpdateText,
  onUpdateScore,
  onDelete,
  canDelete
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [textValue, setTextValue] = useState(option.text || option.value || '');

  const handleSubmit = () => {
    onUpdateText(textValue);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    } else if (e.key === 'Escape') {
      setTextValue(option.text || option.value || '');
      setIsEditing(false);
    }
  };

  return (
    <div className="flex items-center justify-center gap-3 bg-gray-50 hover:bg-gray-100 px-3 py-2 rounded-md">
      <div className="flex items-center justify-center">
        {questionType === 'single-choice' ? (
          <input
            type="radio"
            className="w-4 h-4 text-blue-600 border-gray-400 focus:ring-blue-500 focus:ring-2 cursor-default"
            disabled
            readOnly
          />
        ) : (
          <input
            type="checkbox"
            className="w-4 h-4 text-blue-600 border-gray-400 rounded focus:ring-blue-500 focus:ring-2 cursor-default"
            disabled
            readOnly
          />
        )}
      </div>
      
      <div className="flex-1">
        {isEditing ? (
          <Input
            value={textValue}
            onChange={(e) => setTextValue(e.target.value)}
            onBlur={handleSubmit}
            onKeyDown={handleKeyDown}
            className="bg-white rounded-md text-sm"
            autoFocus
          />
        ) : (
          <div
            className="cursor-pointer transition-colors text-left px-3 py-2 rounded-md text-gray-700 text-sm"
            onClick={() => setIsEditing(true)}
          >
            {option.text || option.value || `Option ${index + 1}`}
          </div>
        )}
      </div>
      
      {enableScoring && (
        <div className="flex items-center gap-2 flex-shrink-0">
          <Input
            type="number"
            value={option.score || 0}
            onChange={(e) => onUpdateScore(Number(e.target.value))}
            className="w-16 h-9 text-sm text-center"
            min={0}
          />
        </div>
      )}
      
      {canDelete && (
        <Button
          variant="neutral"
          size="icon"
          onClick={onDelete}
          className="text-gray-600 hover:text-red-600 h-6 w-6 flex-shrink-0"
        >
          <span className="sr-only">Delete</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </Button>
      )}
    </div>
  );
};

