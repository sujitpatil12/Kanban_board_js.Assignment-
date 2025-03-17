
import { ColumnType, useKanbanStore } from '@/lib/kanbanStore';
import { useState, useEffect } from 'react';
import Column from './Column';
import { toast } from '@/hooks/use-toast';

const KanbanBoard = () => {
  const { tasks, searchQuery, moveTask } = useKanbanStore();
  const [draggedTaskId, setDraggedTaskId] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Handle drag start
  const handleDragStart = (e: React.DragEvent, taskId: string) => {
    setDraggedTaskId(taskId);
    setIsDragging(true);
    
    // Use the setData method to store the task id
    e.dataTransfer.setData('taskId', taskId);
    
    // Set the drag image (optional)
    const draggedElement = e.currentTarget as HTMLElement;
    if (draggedElement) {
      // Add a class to the dragged element
      draggedElement.classList.add('task-dragging');
      
      // Set drag image with offset
      e.dataTransfer.setDragImage(draggedElement, 20, 20);
    }
    
    // Set effectAllowed
    e.dataTransfer.effectAllowed = 'move';
  };

  // Handle drag over
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  // Handle drop
  const handleDrop = (e: React.DragEvent, columnType: ColumnType) => {
    e.preventDefault();
    
    const taskId = e.dataTransfer.getData('taskId') || draggedTaskId;
    
    if (taskId) {
      const task = tasks.find(t => t.id === taskId);
      
      if (task && task.column !== columnType) {
        moveTask(taskId, columnType);
        
        // Show success toast
        toast({
          title: 'Task moved',
          description: `Task moved to ${getColumnTitle(columnType)}`,
        });
      }
    }
    
    setDraggedTaskId(null);
    setIsDragging(false);
    
    // Clean up any CSS classes
    document.querySelectorAll('.task-dragging').forEach(el => {
      el.classList.remove('task-dragging');
    });
  };

  // Handle drag end (cleanup)
  useEffect(() => {
    const handleDragEnd = () => {
      setIsDragging(false);
      setDraggedTaskId(null);
      
      // Clean up any CSS classes
      document.querySelectorAll('.task-dragging').forEach(el => {
        el.classList.remove('task-dragging');
      });
    };

    window.addEventListener('dragend', handleDragEnd);
    
    return () => {
      window.removeEventListener('dragend', handleDragEnd);
    };
  }, []);

  // Filter tasks based on search query
  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Function to get tasks for a specific column
  const getColumnTasks = (columnType: ColumnType) => {
    return filteredTasks.filter(task => task.column === columnType);
  };

  // Function to get column title
  const getColumnTitle = (columnType: ColumnType): string => {
    switch (columnType) {
      case 'todo':
        return 'To Do';
      case 'progress':
        return 'In Progress';
      case 'review':
        return 'Peer Review';
      case 'done':
        return 'Done';
      default:
        return '';
    }
  };

  return (
    <div className={`px-1 pt-2 pb-8 flex flex-col h-full ${isDragging ? 'cursor-grabbing' : ''}`}>
      <div className="flex flex-1 gap-4 overflow-x-auto pb-6 pt-2 px-2 min-h-[calc(100vh-140px)]">
        {(['todo', 'progress', 'review', 'done'] as ColumnType[]).map((columnType) => (
          <Column
            key={columnType}
            title={getColumnTitle(columnType)}
            type={columnType}
            tasks={getColumnTasks(columnType)}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          />
        ))}
      </div>
      
      {/* Search results indicator */}
      {searchQuery && (
        <div className="fixed left-0 right-0 bottom-0 p-2 bg-white/80 backdrop-blur-sm border-t text-center text-sm text-gray-500">
          Showing {filteredTasks.length} results for "{searchQuery}"
        </div>
      )}
    </div>
  );
};

export default KanbanBoard;
