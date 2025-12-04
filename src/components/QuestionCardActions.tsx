import { Button } from "./Button";
import { Plus, Trash } from "../assets/icons";

interface QuestionCardActionsProps {
  onAdd: () => void;
  onDelete: () => void;
  canDelete: boolean;
}

export const QuestionCardActions = ({
  onAdd,
  onDelete,
  canDelete,
}: QuestionCardActionsProps) => {
  return (
    <div className="absolute -right-[33px] top-4 flex flex-col gap-0 z-10">
      <Button
        variant="link"
        size="sm"
        className="h-8 w-8 bg-primary-100 rounded-sm focus:ring-0 focus:ring-offset-0"
        onClick={onAdd}
        title="Add question after this one"
      >
        <Plus className="h-4 w-4" />
      </Button>
      <Button
        variant="link"
        size="sm"
        className="h-8 w-8 bg-error-100 text-error-500 rounded-sm focus:ring-0 focus:ring-offset-0"
        onClick={onDelete}
        disabled={!canDelete}
        title={!canDelete ? "Cannot delete the last question" : "Delete this question"}
      >
        <Trash className="h-4 w-4" />
      </Button>
    </div>
  );
};

