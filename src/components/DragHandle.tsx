import * as React from "react";
import { GripVertical } from "../assets/icons";
import { cn } from "../utils";

interface DragHandleProps {
  isDragging: boolean;
  dragRef?: (element: HTMLDivElement | null) => void;
}

export const DragHandle: React.FC<DragHandleProps> = ({
  isDragging,
  dragRef
}) => {
  return (
    <div 
      ref={dragRef}
      className={cn(
        "absolute -left-[18px] top-8 transition-opacity cursor-grab active:cursor-grabbing bg-gray-100 rounded-sm",
        isDragging ? "opacity-100" : "opacity-0 group-hover:opacity-100"
      )}
      title="Drag to reorder"
    >
      <GripVertical className="h-4 w-4 text-gray-400 hover:text-gray-600" />
    </div>
  );
};

