export interface Task {
  id: number;
  category: 'Daily' | 'Weekly' | 'Special';
  title: string;
  stars: number;
  description: string;
}

export interface NewTask {
  title: string;
  description: string;
  stars: string;
  category: Task['category'];
}
