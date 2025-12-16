import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.page').then(m => m.HomePage)
  },
  {
    path: 'task-list',
    loadComponent: () => import('./pages/task-list/task-list.page').then(m => m.TaskListPage)
  },
  {
    path: 'add-task',
    loadComponent: () => import('./pages/add-task/add-task.page').then(m => m.AddTaskPage)
  },
  {
    path: 'task-detail/:id',
    loadComponent: () => import('./pages/task-detail/task-detail.page').then(m => m.TaskDetailPage)
  },
];
