
import { ColumnType, Task as TaskType } from '@/lib/kanbanStore';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import Task from './Task';

interface ColumnProps {
  title: string;
  type: ColumnType;
  tasks: TaskType[];
  onDragStart: (e: React.DragEvent, taskId: string) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent, columnType: ColumnType) => void;
}

const Column = ({ 
  title, 
  type, 
  tasks, 
  onDragStart, 
  onDragOver, 
  onDrop 
}: ColumnProps) => {
  const [isDragOver, setIsDragOver] = useState(false);

  // Get the appropriate background color based on column type
  const getBackgroundColor = (type: ColumnType) => {
    switch (type) {
      case 'todo':
        return 'bg-kanban-todo';
      case 'progress':
        return 'bg-kanban-progress';
      case 'review':
        return 'bg-kanban-review';
      case 'done':
        return 'bg-kanban-done';
      default:
        return 'bg-gray-50';
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
    onDragOver(e);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    setIsDragOver(false);
    onDrop(e, type);
  };

  return (
    <div 
      className={cn(
        'kanban-column rounded-lg p-4 w-full flex-1 min-w-[280px] min-h-[200px] transition-all ease-in-out duration-300',
        getBackgroundColor(type),
        isDragOver && 'drag-over'
      )}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-medium">{title}</h2>
        <div className="flex items-center justify-center w-6 h-6 rounded-full bg-white text-xs font-medium">
          {tasks.length}
        </div>
      </div>
      
      <div className="min-h-[calc(100%-40px)]">
        {tasks.map((task) => (
          <Task 
            key={task.id}
            task={task}
            onDragStart={onDragStart}
          />
        ))}
        {tasks.length === 0 && (
          <div className="flex items-center justify-center h-20 border border-dashed rounded-md border-gray-200 bg-white/50">
            <span className="text-sm text-gray-400">No tasks</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Column;
