import * as React from "react";
import { GripVertical } from "./icons";
import { cn } from "../utils";

interface DragHandleProps {
  isDragging: boolean;
  onMouseDown?: (e: React.MouseEvent) => void;
}

export const DragHandle: React.FC<DragHandleProps> = ({
  isDragging,
  onMouseDown
}) => {
  return (
    <div 
      className={cn(
        "absolute left-2 top-4 transition-opacity cursor-grab active:cursor-grabbing",
        isDragging ? "opacity-100" : "opacity-0 group-hover:opacity-100"
      )}
      onMouseDown={(e) => {
        e.stopPropagation();
        // Make the card draggable when clicking the handle
        const card = e.currentTarget.closest('[draggable]') as HTMLElement;
        if (card) {
          card.draggable = true;
        }
        onMouseDown?.(e);
      }}
      title="Drag to reorder"
    >
      <GripVertical className="h-4 w-4 text-gray-400 hover:text-gray-600" />
    </div>
  );
};

