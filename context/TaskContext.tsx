import { createContext, useContext, useState, ReactNode } from 'react';

export interface Task {
  id: number;
  category: 'Daily' | 'Weekly' | 'Special';
  title: string;
  stars: number;
  description?: string;
}

interface TaskContextType {
  tasks: Task[];
  addTask: (task: Omit<Task, 'id'>) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

const initialTasks: Task[] = [];

export function TaskProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const addTask = (newTask: Omit<Task, 'id'>) => {
    setTasks(currentTasks => [
      ...currentTasks,
      { ...newTask, id: Math.max(...currentTasks.map(t => t.id), 0) + 1 },
    ]);
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask }}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
}
