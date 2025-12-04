import * as React from "react";
import { useState } from "react";
import { Input, Button, NumberInput, Badge } from "../index";
import { Close } from "../../assets/icons";
import type { QuestionOption, Question } from "../../types";
import { cn } from "../../utils";

interface OptionIndicatorProps {
  type: Question['type'];
  selected?: boolean;
  onSelect: () => void;
}

const OptionIndicator: React.FC<OptionIndicatorProps> = ({ type, selected, onSelect }) => {
  const baseClasses = "w-4 h-4 text-blue-600 border-gray-400 focus:ring-blue-500 focus:ring-2 cursor-pointer";
  
  if (type === 'single-choice') {
    return (
      <input 
        type="radio" 
        className={baseClasses} 
        checked={selected || false}
        onChange={onSelect}
      />
    );
  }
  
  return (
    <input 
      type="checkbox" 
      className={cn(baseClasses, "rounded")} 
      checked={selected || false}
      onChange={onSelect}
    />
  );
};

interface EditableTextProps {
  value: string;
  displayText: string;
  isEditing: boolean;
  onEdit: () => void;
  onChange: (value: string) => void;
  onSubmit: () => void;
  onCancel: () => void;
}

const EditableText: React.FC<EditableTextProps> = ({
  value,
  displayText,
  isEditing,
  onEdit,
  onChange,
  onSubmit,
  onCancel,
}) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSubmit();
    } else if (e.key === 'Escape') {
      onCancel();
    }
  };

  if (isEditing) {
    return (
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onSubmit}
        onKeyDown={handleKeyDown}
        className="bg-white rounded-md text-sm focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 outline-none"
        autoFocus
      />
    );
  }

  return (
    <div
      className="cursor-pointer transition-colors text-left px-3 py-2 rounded-md text-gray-700 text-sm"
      onClick={onEdit}
    >
      {displayText}
    </div>
  );
};

interface ScoreSectionProps {
  score: number;
  isFocused: boolean;
  onScoreChange: (score: number) => void;
  onFocus: () => void;
  onBlur: () => void;
}

const ScoreSection: React.FC<ScoreSectionProps> = ({
  score,
  isFocused,
  onScoreChange,
  onFocus,
  onBlur,
}) => (
  <div className="flex items-center gap-2 flex-shrink-0">
    <Badge
      variant="outline"
      className={cn(
        "w-10 h-10 text-sm rounded-full border-0",
        isFocused 
          ? "bg-primary-100 text-primary-500" 
          : "bg-neutral-light text-gray-500"
      )}
    >
      {score}
    </Badge>
    <NumberInput
      value={score}
      onChange={(e) => onScoreChange(Number(e.target.value))}
      onFocus={onFocus}
      onBlur={onBlur}
      className={cn(
        "w-16 h-9 text-sm text-center bg-gray-100",
        isFocused ? "border-primary-500" : ""
      )}
      min={0}
    />
  </div>
);

interface DeleteButtonProps {
  onDelete: () => void;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ onDelete }) => (
  <Button
    variant="link"
    size="icon"
    onClick={onDelete}
    className="text-gray-600 hover:text-red-600 h-6 w-6 flex-shrink-0"
  >
    <span className="sr-only">Delete</span>
    <Close className="h-4 w-4" />
  </Button>
);

interface OptionRowProps {
  option: QuestionOption;
  index: number;
  questionType: Question['type'];
  enableScoring: boolean;
  onUpdateText: (text: string) => void;
  onUpdateScore: (score: number) => void;
  onDelete: () => void;
  onSelect: () => void;
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
  onSelect,
  canDelete
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [textValue, setTextValue] = useState(option.text || option.value || '');
  const [isNumberInputFocused, setIsNumberInputFocused] = useState(false);

  const displayText = option.text || option.value || `Option ${index + 1}`;
  const currentScore = option.score || 0;

  const handleSubmit = () => {
    onUpdateText(textValue);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTextValue(option.text || option.value || '');
    setIsEditing(false);
  };

  return (
    <div className="flex items-center justify-center gap-3 bg-neutral-50 hover:bg-gray-100 px-3 py-2 rounded-md">
      <div className="flex items-center justify-center">
        <OptionIndicator type={questionType} selected={option.selected} onSelect={onSelect} />
      </div>
      
      <div className="flex-1">
        <EditableText
          value={textValue}
          displayText={displayText}
          isEditing={isEditing}
          onEdit={() => setIsEditing(true)}
          onChange={setTextValue}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      </div>
      
      {enableScoring && (
        <ScoreSection
          score={currentScore}
          isFocused={isNumberInputFocused}
          onScoreChange={onUpdateScore}
          onFocus={() => setIsNumberInputFocused(true)}
          onBlur={() => setIsNumberInputFocused(false)}
        />
      )}
      {canDelete && <DeleteButton onDelete={onDelete} />}
    </div>
  );
};
