import { cn } from "../../utils";
import { Button } from "../ui/Button";
import { Plus } from "../../assets/icons";
import { OptionRow } from "./OptionRow";
import type { Question, QuestionOption } from "../../types";

interface OptionsEditorProps {
  options: QuestionOption[];
  questionType: Question["type"];
  enableScoring: boolean;
  onUpdateText: (optionId: string, text: string) => void;
  onUpdateScore: (optionId: string, score: number) => void;
  onDelete: (optionId: string) => void;
  onSelect: (optionId: string) => void;
  onAddOption: () => void;
}

export const OptionsEditor = ({
  options,
  questionType,
  enableScoring,
  onUpdateText,
  onUpdateScore,
  onDelete,
  onSelect,
  onAddOption,
}: OptionsEditorProps) => {
  return (
    <div className="space-y-1">
      <div className="space-y-2">
        {options.map((option, index) => {
          const hasZeroScore = enableScoring && option.score === 0;
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
                questionType={questionType}
                enableScoring={enableScoring}
                onUpdateText={(text) => option.id && onUpdateText(option.id, text)}
                onUpdateScore={(score) => option.id && onUpdateScore(option.id, score)}
                onDelete={() => option.id && onDelete(option.id)}
                onSelect={() => option.id && onSelect(option.id)}
                canDelete={options.length > 1}
              />
            </div>
          );
        })}
      </div>

      <div className="pt-2">
        <Button
          variant="link"
          size="sm"
          onClick={onAddOption}
          color="primary"
          className="flex items-center gap-2 h-auto"
        >
          <Plus className="h-4 w-4" />
          <span className="text-sm">Add option</span>
        </Button>
      </div>
    </div>
  );
};

