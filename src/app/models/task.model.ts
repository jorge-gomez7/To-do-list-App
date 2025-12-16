export interface Task {
  id: string;
  title: string;
  description: string;
  category: TaskCategory;
  completed: boolean;
  createdAt: Date;
  completedAt?: Date;
}

export type TaskCategory = 'trabajo' | 'casa' | 'negocios';

export interface TaskStats {
  total: number;
  pending: number;
  completed: number;
  byCategory: {
    trabajo: number;
    casa: number;
    negocios: number;
  };
}

