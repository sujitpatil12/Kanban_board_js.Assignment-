
import { Plus } from 'lucide-react';
import { useState } from 'react';
import AddTaskDialog from './AddTaskDialog';

const AddTaskButton = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <button
        className="add-button fixed right-6 bottom-6 flex items-center justify-center p-3.5 rounded-full bg-primary text-white shadow-lg hover:bg-primary/90 animate-float"
        onClick={() => setIsDialogOpen(true)}
        aria-label="Add new task"
      >
        <Plus className="w-6 h-6" />
      </button>
      
      <AddTaskDialog 
        isOpen={isDialogOpen} 
        onClose={() => setIsDialogOpen(false)} 
      />
    </>
  );
};

export default AddTaskButton;
