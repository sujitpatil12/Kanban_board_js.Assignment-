
import KanbanBoard from '@/components/KanbanBoard';
import SearchBar from '@/components/SearchBar';
import AddTaskButton from '@/components/AddTaskButton';
import { useEffect } from 'react';

const Kanban = () => {
  // Set document title
  useEffect(() => {
    document.title = 'Kanban Board';
    
    return () => {
      document.title = 'agile-task-ocean';
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col max-w-[1600px] mx-auto px-4 py-6">
      <header className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-medium text-center mb-1">Kanban Board</h1>
        <p className="text-gray-500 text-center text-sm mb-6">Manage your tasks efficiently</p>
        <SearchBar />
      </header>

      <main className="flex-1 overflow-hidden">
        <KanbanBoard />
      </main>
      
      <AddTaskButton />
    </div>
  );
};

export default Kanban;
