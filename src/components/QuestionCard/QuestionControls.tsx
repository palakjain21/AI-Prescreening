import { Select } from "../ui/Select";
import { Toggle } from "../ui/Toggle";
import type { Question } from "../../types";

interface QuestionControlsProps {
  type: Question["type"];
  disqualifier: boolean;
  enableScoring: boolean;
  onTypeChange: (type: Question["type"]) => void;
  onDisqualifierChange: (checked: boolean) => void;
  onEnableScoringChange: (checked: boolean) => void;
}

export const QuestionControls = ({
  type,
  disqualifier,
  enableScoring,
  onTypeChange,
  onDisqualifierChange,
  onEnableScoringChange,
}: QuestionControlsProps) => {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <Select
          options={[
            { value: "single-choice", label: "Single Choice" },
            { value: "multiple-choice", label: "Multiple Choice" },
            { value: "free-text", label: "Free Text" },
          ]}
          value={type}
          onValueChange={(value) => onTypeChange(value as Question["type"])}
          className="h-9 w-[160px] text-sm"
        />
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm font-regular">Disqualifier</span>
          <Toggle checked={disqualifier} onCheckedChange={onDisqualifierChange} />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm font-regular">Enable Scoring</span>
          <Toggle
            checked={enableScoring}
            onCheckedChange={onEnableScoringChange}
            disabled={type === "free-text"}
          />
        </div>
      </div>
    </div>
  );
};

