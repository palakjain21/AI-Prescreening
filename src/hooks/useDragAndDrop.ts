import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import type { Identifier } from "dnd-core";

const QUESTION_CARD_TYPE = 'QUESTION_CARD';

interface DragItem {
  index: number;
  id: string;
  type: string;
}

interface UseDragAndDropProps {
  id: string;
  index: number;
  onDrop: (dragIndex: number, hoverIndex: number) => void;
  onHover?: (hoverIndex: number | null) => void;
  onDragStart?: (dragIndex: number) => void;
  onDragEnd?: () => void;
}

export const useDragAndDrop = ({
  id,
  index,
  onDrop,
  onHover,
  onDragStart,
  onDragEnd,
}: UseDragAndDropProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const [{ handlerId, isOver }, drop] = useDrop<DragItem, void, { handlerId: Identifier | null; isOver: boolean }>({
    accept: QUESTION_CARD_TYPE,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
        isOver: monitor.isOver(),
      };
    },
    hover(item: DragItem) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      // Don't do anything if hovering over itself
      if (dragIndex === hoverIndex) {
        onHover?.(null);
        return;
      }

      // Just notify about hover for visual feedback
      onHover?.(hoverIndex);
    },
    drop(item: DragItem) {
      const dragIndex = item.index;
      const dropIndex = index;

      // Only perform the move on drop
      if (dragIndex !== dropIndex) {
        onDrop(dragIndex, dropIndex);
      }
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: QUESTION_CARD_TYPE,
    item: () => {
      onDragStart?.(index);
      return { id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: () => {
      // Clear states when drag ends
      onHover?.(null);
      onDragEnd?.();
    },
  });

  // Connect drag and drop to the same ref
  drag(drop(ref));

  return {
    ref,
    isDragging,
    isOver,
    handlerId,
    drag,
  };
};

