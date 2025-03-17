
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type ColumnType = 'todo' | 'progress' | 'review' | 'done';

export interface Task {
  id: string;
  title: string;
  description: string;
  column: ColumnType;
  createdAt: Date;
}

interface KanbanState {
  tasks: Task[];
  searchQuery: string;
  addTask: (title: string, description: string) => void;
  moveTask: (taskId: string, targetColumn: ColumnType) => void;
  updateSearchQuery: (query: string) => void;
}

export const useKanbanStore = create<KanbanState>()(
  persist(
    (set) => ({
      tasks: [],
      searchQuery: '',
      
      addTask: (title, description) => 
        set((state) => ({
          tasks: [
            ...state.tasks,
            {
              id: crypto.randomUUID(),
              title,
              description,
              column: 'todo',
              createdAt: new Date(),
            },
          ],
        })),
      
      moveTask: (taskId, targetColumn) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === taskId ? { ...task, column: targetColumn } : task
          ),
        })),
      
      updateSearchQuery: (query) => set({ searchQuery: query }),
    }),
    {
      name: 'kanban-storage',
    }
  )
);

<lov-add-dependency>zustand@latest</lov-add-dependency>
