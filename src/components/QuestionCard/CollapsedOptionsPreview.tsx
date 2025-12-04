import { cn } from "../../utils";
import type { QuestionOption } from "../../types";

interface CollapsedOptionsPreviewProps {
  options: QuestionOption[];
  enableScoring: boolean;
}

export const CollapsedOptionsPreview = ({
  options,
  enableScoring,
}: CollapsedOptionsPreviewProps) => {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {options.map((option, index) => {
        const hasZeroScore = enableScoring && option.score === 0;
        return (
          <div
            key={option.id || `option-${index}`}
            className={cn(
              "inline-flex items-center gap-1.5 px-2 rounded-md text-sm border transition-colors",
              hasZeroScore
                ? "text-red-700 border-red-300"
                : "text-neutral border-neutral-100"
            )}
          >
            <span>{option.text} </span>
            <span className="text-gray-100 text-3xl font-regular"> | </span>
            {enableScoring && (
              <span className="text-xs font-medium w-6 h-6 flex items-center justify-center bg-primary-100 text-primary-500 rounded-md">
                {option.score}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
};

