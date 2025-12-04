import { useState, useEffect } from "react";
import { Input } from "../ui/Input";

interface QuestionTitleProps {
  title: string;
  onTitleChange: (title: string) => void;
}

export const QuestionTitle = ({ title, onTitleChange }: QuestionTitleProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(title);

  useEffect(() => {
    setValue(title);
  }, [title]);

  const handleSubmit = () => {
    onTitleChange(value);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit();
    } else if (e.key === "Escape") {
      setValue(title);
      setIsEditing(false);
    }
  };

  if (isEditing) {
    return (
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={handleSubmit}
        onKeyDown={handleKeyDown}
        className="font-medium text-sm bg-white border border-gray-300 rounded-md focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 outline-none mb-2"
        autoFocus
      />
    );
  }

  return (
    <div
      className="font-medium text-sm cursor-pointer transition-colors text-left hover:bg-gray-50 px-3 py-2.5 rounded-md text-gray-900 w-full mb-2"
      onClick={() => setIsEditing(true)}
    >
      {title || "How many years of experience do you hold?"}
    </div>
  );
};

