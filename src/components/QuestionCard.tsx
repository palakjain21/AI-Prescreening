import * as React from "react";
import { useState } from "react";
import { cn } from "../utils";
import {
  Card,
  CardContent,
  CardHeader,
  Badge,
  Button,
  Input,
  Select,
  Toggle,
  DeleteModal,
} from "./index";
import { Plus, Trash, ChevronDown, ChevronUp } from "../assets/icons";
import { OptionRow } from "./OptionRow";
import { DragHandle } from "./DragHandle";
import { useDragAndDrop } from "../hooks/useDragAndDrop";
import type { Question, QuestionCardProps, AddQuestionButtonProps } from "../types";
import { generateOptionId } from "../services/screeningDataService";

const QuestionCard = React.forwardRef<HTMLDivElement, QuestionCardProps>(
  ({ 
    question,
    index,
    onQuestionUpdate, 
    onAddQuestion, 
    onDeleteQuestion,
    onAddOption,
    onDeleteOption,
    onUpdateOption,
    onDrop,
    onHover,
    onDragStart,
    onDragEnd,
    draggedIndex,
    ...props 
  }, ref) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isEditingTitle, setIsEditingTitle] = useState(false);
    const [titleValue, setTitleValue] = useState(question.title || question.question || '');
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [isOpen, setIsOpen] = useState(question.isOpen ?? true);

    const handleTitleSubmit = () => {
      if (question.id) {
        onQuestionUpdate(question.id, { title: titleValue });
      }
      setIsEditingTitle(false);
    };

    const handleTitleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
        handleTitleSubmit();
      } else if (e.key === 'Escape') {
        setTitleValue(question.title || question.question || '');
        setIsEditingTitle(false);
      }
    };

    const handleTypeChange = (newType: Question['type']) => {
      const updates: Partial<Question> = { type: newType };
      
      // Reset options for free-text questions
      if (newType === 'free-text') {
        updates.options = [];
        updates.score = undefined;
      } else if (!question.options || question.options.length === 0) {
        // Add default options for choice questions
        updates.options = [
          { id: generateOptionId(question.id!), text: 'Option 1', score: 0 },
          { id: generateOptionId(question.id!), text: 'Option 2', score: 0 },
        ];
      }
      
      if (question.id) {
        onQuestionUpdate(question.id, updates);
      }
    };

    const handleDisqualifierChange = (checked: boolean) => {
      if (question.id) {
        onQuestionUpdate(question.id, { disqualifier: checked });
      }
    };

    const handleEnableScoringChange = (checked: boolean) => {
      if (question.id) {
        onQuestionUpdate(question.id, { enableScoring: checked });
      }
    };

    const handleToggleOpen = () => {
      const newIsOpen = !isOpen;
      setIsOpen(newIsOpen);
      if (question.id) {
        onQuestionUpdate(question.id, { isOpen: newIsOpen });
      }
    };


    const handleAddOption = () => {
      if (!onAddOption || !question.id) return;
      onAddOption(question.id);
    };

    const handleDeleteOption = (optionId: string) => {
      if (!onDeleteOption || !question.id) return;
      onDeleteOption(question.id, optionId);
    };

    const handleUpdateOptionText = (optionId: string, text: string) => {
      if (!onUpdateOption || !question.id) return;
      onUpdateOption(question.id, optionId, { text });
    };

    const handleUpdateOptionScore = (optionId: string, score: number) => {
      if (!onUpdateOption || !question.id) return;
      onUpdateOption(question.id, optionId, { score });
    };

    const getQuestionTypeBadgeText = (type: Question['type']) => {
      switch (type) {
        case 'single-choice':
          return 'Single Choice';
        case 'multiple-choice':
          return 'Multiple Choice';
        case 'free-text':
          return 'Free Text';
        default:
          return type;
      }
    };

    const { ref: dndRef, isDragging, isOver, drag } = useDragAndDrop({
      id: question.id || '',
      index,
      onDrop,
      onHover,
      onDragStart,
      onDragEnd,
    });

    // Merge refs (external ref and dnd ref)
    const mergedRef = React.useCallback(
      (node: HTMLDivElement | null) => {
        dndRef.current = node;
        if (typeof ref === 'function') {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
      },
      [ref, dndRef]
    );

    // Check if this card is being hovered over during drag
    const isBeingHoveredDuringDrag = isOver && draggedIndex !== null && draggedIndex !== index;

    return (
      <Card
        ref={mergedRef}
        variant="question"
        className={cn(
          "relative group transition-all duration-200",
          isHovered && "shadow-md border-blue-200",
          isDragging && "opacity-50 cursor-grabbing",
          isBeingHoveredDuringDrag && "border-blue-400 border-2 shadow-lg"
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        {...props}
      >
        {/* Hover Actions */}
        {isHovered && (
          <div className="absolute -right-[33px] top-4 flex flex-col gap-0 z-10">
            <Button
              variant="link"
              size="sm"
              className="h-8 w-8 bg-primary-100 rounded-sm focus:ring-0 focus:ring-offset-0"
              onClick={() => question.id && onAddQuestion(question.id)}
              title="Add question after this one"
            >
              <Plus className="h-4 w-4" />
            </Button>
            <Button
              variant="link"
              size="sm"
              className="h-8 w-8 bg-error-100 text-error-500 rounded-sm focus:ring-0 focus:ring-offset-0"
              onClick={() => setShowDeleteModal(true)}
              title="Delete this question"
            >
              <Trash className="h-4 w-4" />
            </Button>
          </div>
        )}

        {/* Drag Handle */}
        {/* <DragHandle isDragging={isDragging} dragRef={drag} /> */}

        <CardHeader className="pb-4 px-2">
        <DragHandle isDragging={isDragging} dragRef={drag} />

          {/* Badges and Toggle Row */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Badge variant={question.type as any}>
                {getQuestionTypeBadgeText(question.type)}
              </Badge>
              
              {question.disqualifier && (
                <Badge variant="destructive">
                  Disqualifier
                </Badge>
              )}
              
              {question.enableScoring && (
                <Badge variant="eligibility">
                  Eligibility
                </Badge>
              )}

              {/* Technical Skills badge for free-text questions */}
              {question.type === 'free-text' && (
                <Badge variant="technical-skills">
                  Technical Skills
                </Badge>
              )}
            </div>
          </div>

          {/* Question Title */}
          <div className="mb-4 flex items-center justify-between gap-2">
            {isEditingTitle ? (
              <Input
                value={titleValue}
                onChange={(e) => setTitleValue(e.target.value)}
                onBlur={handleTitleSubmit}
                onKeyDown={handleTitleKeyDown}
                className="font-medium text-sm bg-white border border-gray-300 rounded-md "
                autoFocus
              />
            ) : (
              <div
                className="font-medium text-sm cursor-pointer transition-colors text-left hover:bg-gray-50 px-3 py-2.5 rounded-md text-gray-900"
                onClick={() => setIsEditingTitle(true)}
              >
                {question.title || question.question || "How many years of experience do you hold?"}
              </div>
            )}
                        {/* Chevron Toggle */}
                        <Button
              variant="link"
              size="sm"
              onClick={handleToggleOpen}
              className="p-1 rounded transition-colors"
              title={isOpen ? "Collapse question" : "Expand question"}
            >
              {isOpen ? (
                <ChevronUp className="h-5 w-5 text-gray-500" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-500" />
              )}
            </Button>
          </div>

          {/* Collapsed View - Options as Pills */}
          {!isOpen && (question.type === 'single-choice' || question.type === 'multiple-choice') && (
            <div className="flex flex-wrap gap-2 mb-4">
              {question.options?.map((option, index) => {
                const hasZeroScore = question.enableScoring && option.score === 0;
                return (
                  <div
                    key={option.id || `option-${index}`}
                    className={cn(
                      "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm border transition-colors",
                      hasZeroScore
                        ? "bg-red-50 text-red-700 border-red-300"
                        : "bg-neutral-100 text-gray-700 border-gray-200"
                    )}
                  >
                    <span>{option.text}</span>
                    {question.enableScoring && (
                      <span className="text-xs font-medium">{option.score}</span>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Controls Row - Only show when expanded */}
          {isOpen && (
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Select
                  options={[
                    { value: 'single-choice', label: 'Single Choice' },
                    { value: 'multiple-choice', label: 'Multiple Choice' },
                    { value: 'free-text', label: 'Free Text' },
                  ]}
                  value={question.type}
                  onValueChange={(value) => handleTypeChange(value as Question['type'])}
                  className="h-9 w-[160px] text-sm"
                />
              </div>
              
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-regular">Disqualifier</span>
                  <Toggle
                    checked={question.disqualifier || false}
                    onCheckedChange={handleDisqualifierChange}
                  />
                </div>
                
                <div className="flex items-center gap-2">
                  <span className="text-sm font-regular">Enable Scoring</span>
                  <Toggle
                    checked={question.enableScoring || false}
                    onCheckedChange={handleEnableScoringChange}
                  />
                </div>
              </div>
            </div>
          )}
        </CardHeader>

        {/* Expanded Content */}
        {isOpen && (
          <CardContent className="px-4 space-y-2">
            {/* Options for Choice Questions */}
            {(question.type === 'single-choice' || question.type === 'multiple-choice') && (
              <div className="space-y-1">
                {/* Options list */}
                <div className="space-y-2">
                  {question.options?.map((option, index) => {
                    const hasZeroScore = question.enableScoring && option.score === 0;
                    return (
                      <div
                        key={option.id || `option-${index}`}
                        className={cn(
                          "transition-all duration-200",
                          hasZeroScore && "ring-2 ring-red-300 rounded-md"
                        )}
                      >
                        <OptionRow
                          option={option}
                          index={index}
                          questionType={question.type}
                          enableScoring={question.enableScoring || false}
                          onUpdateText={(text) => option.id && handleUpdateOptionText(option.id, text)}
                          onUpdateScore={(score) => option.id && handleUpdateOptionScore(option.id, score)}
                          onDelete={() => option.id && handleDeleteOption(option.id)}
                          canDelete={question.options ? question.options.length > 1 : false}
                        />
                      </div>
                    );
                  })}
                </div>
                
                {/* Add option button - moved below all options */}
                <div className="pt-2">
                  <Button
                    variant="link"
                    size="sm"
                    onClick={handleAddOption}
                    color="primary"
                    className="flex items-center gap-2 h-auto"
                  >
                    <Plus className="h-4 w-4" />
                    <span className="text-sm">Add option</span>
                  </Button>
                </div>
              </div>
            )}

          </CardContent>
        )}

        {/* Delete Confirmation Modal */}
        <DeleteModal
          open={showDeleteModal}
          onOpenChange={setShowDeleteModal}
          onConfirm={() => {
            if (question.id) {
              onDeleteQuestion(question.id);
            }
          }}
          title="Delete Question"
          description="Are you sure you want to delete the question from the Prescreening Chat Flow?"
          confirmText="Delete"
          cancelText="Cancel"
        />
      </Card>
    );
  }
);

QuestionCard.displayName = "QuestionCard";

const AddQuestionButton = React.forwardRef<HTMLButtonElement, AddQuestionButtonProps>(
  ({ onAddQuestion }) => {
    return (
      <div
      className="border border-dashed border-gray-300 rounded-lg p-4 flex items-center gap-4 cursor-pointer"
      onClick={onAddQuestion}
    >
      <Button
        variant="link"
        size="sm"
        type="button"
        className="focus:ring-0 focus:ring-offset-0"
      >
        <Plus className="h-5 w-5" />
      </Button>

      <div className="flex flex-col justify-center items-start">
        <span className="text-lg font-semibold">Add Question</span>
        <span className="text-gray-500 text-sm">
          Select from a range of single choice, multiple choice & free text
        </span>
      </div>
    </div>

    );
  }
);

AddQuestionButton.displayName = "AddQuestionButton";

export { QuestionCard, AddQuestionButton };
