import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Task, TaskCategory, TaskStats } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private readonly STORAGE_KEY = 'todo_tasks';
  private tasksSubject = new BehaviorSubject<Task[]>([]);
  
  public tasks$ = this.tasksSubject.asObservable();

  constructor() {
    this.loadTasks();
  }

  private loadTasks(): void {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (stored) {
      const tasks = JSON.parse(stored).map((task: Task) => ({
        ...task,
        createdAt: new Date(task.createdAt),
        completedAt: task.completedAt ? new Date(task.completedAt) : undefined
      }));
      this.tasksSubject.next(tasks);
    }
  }

  private saveTasks(tasks: Task[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(tasks));
    this.tasksSubject.next(tasks);
  }

  getTasks(): Task[] {
    return this.tasksSubject.getValue();
  }

  getTaskById(id: string): Task | undefined {
    return this.getTasks().find(task => task.id === id);
  }

  addTask(title: string, description: string, category: TaskCategory): Task {
    const newTask: Task = {
      id: this.generateId(),
      title,
      description,
      category,
      completed: false,
      createdAt: new Date()
    };
    
    const tasks = [...this.getTasks(), newTask];
    this.saveTasks(tasks);
    return newTask;
  }

  updateTask(id: string, updates: Partial<Task>): void {
    const tasks = this.getTasks().map(task => 
      task.id === id ? { ...task, ...updates } : task
    );
    this.saveTasks(tasks);
  }

  toggleComplete(id: string): void {
    const task = this.getTaskById(id);
    if (task) {
      this.updateTask(id, {
        completed: !task.completed,
        completedAt: !task.completed ? new Date() : undefined
      });
    }
  }

  deleteTask(id: string): void {
    const tasks = this.getTasks().filter(task => task.id !== id);
    this.saveTasks(tasks);
  }

  getStats(): TaskStats {
    const tasks = this.getTasks();
    const pending = tasks.filter(t => !t.completed);
    const completed = tasks.filter(t => t.completed);
    
    return {
      total: tasks.length,
      pending: pending.length,
      completed: completed.length,
      byCategory: {
        trabajo: tasks.filter(t => t.category === 'trabajo' && !t.completed).length,
        casa: tasks.filter(t => t.category === 'casa' && !t.completed).length,
        negocios: tasks.filter(t => t.category === 'negocios' && !t.completed).length
      }
    };
  }

  getPendingTasks(): Task[] {
    return this.getTasks().filter(task => !task.completed);
  }

  getCompletedTasks(): Task[] {
    return this.getTasks().filter(task => task.completed);
  }

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }
}

