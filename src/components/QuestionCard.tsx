import * as React from "react";
import { useState } from "react";
import { cn } from "../utils";
import { Card, CardContent, CardHeader, Button, DeleteModal } from "./index";
import { ChevronDown, ChevronUp, Plus } from "../assets/icons";
import { DragHandle } from "./DragHandle";
import { useDragAndDrop } from "../hooks/useDragAndDrop";
import { QuestionCardActions } from "./QuestionCardActions";
import { QuestionBadges } from "./QuestionBadges";
import { QuestionTitle } from "./QuestionTitle";
import { CollapsedOptionsPreview } from "./CollapsedOptionsPreview";
import { QuestionControls } from "./QuestionControls";
import { OptionsEditor } from "./OptionsEditor";
import { FreeTextEditor } from "./FreeTextEditor";
import type { Question, QuestionCardProps, AddQuestionButtonProps } from "../types";
import { generateOptionId } from "../services/screeningDataService";
import { useAppDispatch } from "../store/hooks";
import { selectOption, setAnswer } from "../store/screeningSlice";

const QuestionCard = React.forwardRef<HTMLDivElement, QuestionCardProps>(
  (
    {
      question,
      index,
      totalQuestions,
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
    },
    ref
  ) => {
    const dispatch = useAppDispatch();
    const [isHovered, setIsHovered] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [isOpen, setIsOpen] = useState(question.isOpen ?? true);

    const handleSelectOption = (optionId: string) => {
      if (question.id) {
        dispatch(selectOption({ questionId: question.id, optionId }));
      }
    };

    const handleAnswerChange = (answer: string) => {
      if (question.id) {
        dispatch(setAnswer({ questionId: question.id, answer }));
      }
    };

    const handleTitleChange = (title: string) => {
      if (question.id) {
        onQuestionUpdate(question.id, { title });
      }
    };

    const handleTypeChange = (newType: Question["type"]) => {
      const updates: Partial<Question> = { type: newType };

      if (newType === "free-text") {
        updates.options = [];
        updates.score = undefined;
      } else if (!question.options || question.options.length === 0) {
        updates.options = [
          { id: generateOptionId(question.id!), text: "Option 1", score: 0 },
          { id: generateOptionId(question.id!), text: "Option 2", score: 0 },
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

    const { ref: dndRef, isDragging, isOver } = useDragAndDrop({
      id: question.id || "",
      index,
      onDrop,
      onHover,
      onDragStart,
      onDragEnd,
    });

    const mergedRef = React.useCallback(
      (node: HTMLDivElement | null) => {
        dndRef(node);
        if (typeof ref === "function") {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
      },
      [dndRef, ref]
    );

    const isBeingHoveredDuringDrag =
      isOver && draggedIndex !== null && draggedIndex !== index;
    const hasChoiceOptions =
      question.type === "single-choice" || question.type === "multiple-choice";

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
        {isHovered && (
          <QuestionCardActions
            onAdd={() => question.id && onAddQuestion(question.id)}
            onDelete={() => setShowDeleteModal(true)}
            canDelete={totalQuestions > 1}
          />
        )}

        <CardHeader className="pb-4 px-4">
          <DragHandle isDragging={isDragging} />

          <div className="flex items-center justify-between mb-4 w-full">
            <QuestionBadges
              type={question.type}
              disqualifier={question.disqualifier}
              enableScoring={question.enableScoring}
            />
          </div>

          <div className="mb-4 flex items-center justify-between gap-2 w-full">
            <QuestionTitle
              title={question.title || question.question || ""}
              onTitleChange={handleTitleChange}
            />
            <Button
              variant="link"
              size="sm"
              onClick={handleToggleOpen}
              className="p-1 rounded transition-colors mb-2"
              title={isOpen ? "Collapse question" : "Expand question"}
            >
              {isOpen ? (
                <ChevronUp className="h-5 w-5 text-gray-500" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-500" />
              )}
            </Button>
          </div>

          {!isOpen && hasChoiceOptions && question.options && (
            <CollapsedOptionsPreview
              options={question.options}
              enableScoring={question.enableScoring || false}
            />
          )}

          {isOpen && (
            <QuestionControls
              type={question.type}
              disqualifier={question.disqualifier || false}
              enableScoring={question.enableScoring || false}
              onTypeChange={handleTypeChange}
              onDisqualifierChange={handleDisqualifierChange}
              onEnableScoringChange={handleEnableScoringChange}
            />
          )}
        </CardHeader>

        {isOpen && (
          <CardContent className="px-4 space-y-2">
            {hasChoiceOptions && question.options && (
              <OptionsEditor
                options={question.options}
                questionType={question.type}
                enableScoring={question.enableScoring || false}
                onUpdateText={handleUpdateOptionText}
                onUpdateScore={handleUpdateOptionScore}
                onDelete={handleDeleteOption}
                onSelect={handleSelectOption}
                onAddOption={handleAddOption}
              />
            )}

            {question.type === "free-text" && (
              <FreeTextEditor
                value={question.answer || ""}
                onChange={handleAnswerChange}
              />
            )}
          </CardContent>
        )}

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

const AddQuestionButton = React.forwardRef<
  HTMLButtonElement,
  AddQuestionButtonProps
>(({ onAddQuestion }) => {
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
});

export { QuestionCard, AddQuestionButton };
