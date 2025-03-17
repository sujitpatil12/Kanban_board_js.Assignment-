
import { Task as TaskType } from '@/lib/kanbanStore';
import { cn } from '@/lib/utils';
import { useRef } from 'react';

interface TaskProps {
  task: TaskType;
  onDragStart: (e: React.DragEvent, taskId: string) => void;
}

const Task = ({ task, onDragStart }: TaskProps) => {
  const taskRef = useRef<HTMLDivElement>(null);

  // Truncate description
  const truncateDescription = (text: string, maxLength: number = 120) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  };

  // Get the appropriate border color based on task column
  const getBorderColor = (column: string) => {
    switch (column) {
      case 'todo':
        return 'border-kanban-todo-border';
      case 'progress':
        return 'border-kanban-progress-border';
      case 'review':
        return 'border-kanban-review-border';
      case 'done':
        return 'border-kanban-done-border';
      default:
        return 'border-gray-200';
    }
  };

  return (
    <div
      ref={taskRef}
      draggable
      onDragStart={(e) => onDragStart(e, task.id)}
      className={cn(
        'task-card p-4 mb-3 rounded-lg border bg-white cursor-move animate-fade-in-up',
        getBorderColor(task.column)
      )}
    >
      <div className="mb-2">
        <h3 className="text-base font-medium leading-tight">{task.title}</h3>
      </div>
      <p className="text-sm text-gray-500 mb-2">
        {truncateDescription(task.description)}
      </p>
      <div className="text-xs text-gray-400 mt-3">
        {new Date(task.createdAt).toLocaleDateString()}
      </div>
    </div>
  );
};

export default Task;
