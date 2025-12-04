import { Badge } from "../ui/Badge";
import type { Question } from "../../types";

type QuestionTypeBadgeVariant = "single-choice" | "multiple-choice" | "free-text";

interface QuestionBadgesProps {
  type: Question["type"];
  disqualifier?: boolean;
  enableScoring?: boolean;
}

const getQuestionTypeBadgeText = (type: Question["type"]) => {
  switch (type) {
    case "single-choice":
      return "Single Choice";
    case "multiple-choice":
      return "Multiple Choice";
    case "free-text":
      return "Free Text";
    default:
      return type;
  }
};

export const QuestionBadges = ({
  type,
  disqualifier,
  enableScoring,
}: QuestionBadgesProps) => {
  return (
    <div className="flex items-center gap-2">
      <Badge variant={type as QuestionTypeBadgeVariant}>
        {getQuestionTypeBadgeText(type)}
      </Badge>

      {disqualifier && <Badge variant="destructive">Disqualifier</Badge>}

      {enableScoring && <Badge variant="eligibility">Eligibility</Badge>}

      {type === "free-text" && (
        <Badge variant="technical-skills">Technical Skills</Badge>
      )}
    </div>
  );
};

