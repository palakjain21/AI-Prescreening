import { useCallback, useRef } from "react";
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
  const elementRef = useRef<HTMLDivElement | null>(null);

  const [{ handlerId, isOver }, drop] = useDrop<DragItem, void, { handlerId: Identifier | null; isOver: boolean }>({
    accept: QUESTION_CARD_TYPE,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
        isOver: monitor.isOver(),
      };
    },
    hover(item: DragItem) {
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        onHover?.(null);
        return;
      }
      onHover?.(hoverIndex);
    },
    drop(item: DragItem) {
      const dragIndex = item.index;
      const dropIndex = index;

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
      onHover?.(null);
      onDragEnd?.();
    },
  });

  const ref = useCallback(
    (node: HTMLDivElement | null) => {
      elementRef.current = node;
      drag(drop(node));
    },
    [drag, drop]
  );

  return {
    ref,
    elementRef, 
    isDragging,
    isOver,
    handlerId,
  };
};
