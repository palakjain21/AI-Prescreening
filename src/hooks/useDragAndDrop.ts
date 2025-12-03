import { useCallback } from "react";

interface UseDragAndDropProps {
  index: number;
  onDragStart?: (e: React.DragEvent, index: number) => void;
  onDragOver?: (e: React.DragEvent, index: number) => void;
  onDrop?: (e: React.DragEvent, index: number) => void;
  onDragEnd?: (e: React.DragEvent) => void;
}

export const useDragAndDrop = ({
  index,
  onDragStart,
  onDragOver,
  onDrop,
  onDragEnd,
}: UseDragAndDropProps) => {
  const handleDragStart = useCallback((e: React.DragEvent) => {
    // Prevent dragging when clicking directly on interactive elements (but allow from handle)
    const target = e.target as HTMLElement;
    const isDragHandle = target.closest('[title="Drag to reorder"]');
    
    // Allow dragging from handle, but prevent from buttons/inputs/selects
    if (!isDragHandle && (
      target.tagName === 'BUTTON' ||
      target.tagName === 'INPUT' ||
      target.tagName === 'SELECT' ||
      target.closest('button:not([title="Drag to reorder"])') ||
      target.closest('input') ||
      target.closest('select')
    )) {
      e.preventDefault();
      return;
    }
    
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', index.toString());
    onDragStart?.(e, index);
  }, [index, onDragStart]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    onDragOver?.(e, index);
  }, [index, onDragOver]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    onDrop?.(e, index);
  }, [index, onDrop]);

  const handleDragEnd = useCallback((e: React.DragEvent) => {
    onDragEnd?.(e);
  }, [onDragEnd]);

  return {
    handleDragStart,
    handleDragOver,
    handleDrop,
    handleDragEnd,
  };
};

