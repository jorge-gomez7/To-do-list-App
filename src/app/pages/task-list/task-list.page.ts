import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, ActivatedRoute } from '@angular/router';
import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonBackButton,
  IonIcon,
  IonFab,
  IonFabButton,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonCheckbox,
  IonItemSliding,
  IonItem,
  IonItemOptions,
  IonItemOption,
  IonRippleEffect,
  AlertController,
  ToastController
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  addOutline,
  trashOutline,
  checkmarkOutline,
  briefcaseOutline,
  homeOutline,
  businessOutline,
  ellipsisVerticalOutline,
  checkmarkCircleOutline,
  closeCircleOutline
} from 'ionicons/icons';
import { Subscription } from 'rxjs';
import { TaskService } from '../../services/task.service';
import { Task, TaskCategory } from '../../models/task.model';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.page.html',
  styleUrls: ['./task-list.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonBackButton,
    IonIcon,
    IonFab,
    IonFabButton,
    IonSegment,
    IonSegmentButton,
    IonLabel,
    IonCheckbox,
    IonItemSliding,
    IonItem,
    IonItemOptions,
    IonItemOption,
    IonRippleEffect
  ]
})
export class TaskListPage implements OnInit, OnDestroy {
  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  filter: 'all' | 'pending' | 'completed' = 'all';
  categoryFilter: TaskCategory | null = null;
  private subscription!: Subscription;

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private alertController: AlertController,
    private toastController: ToastController
  ) {
    addIcons({
      addOutline,
      trashOutline,
      checkmarkOutline,
      briefcaseOutline,
      homeOutline,
      businessOutline,
      ellipsisVerticalOutline,
      checkmarkCircleOutline,
      closeCircleOutline
    });
  }

  ngOnInit() {
    // Check query params
    this.route.queryParams.subscribe(params => {
      if (params['filter'] === 'completed') {
        this.filter = 'completed';
      }
      if (params['category']) {
        this.categoryFilter = params['category'] as TaskCategory;
      }
    });

    this.subscription = this.taskService.tasks$.subscribe(tasks => {
      this.tasks = tasks;
      this.applyFilters();
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onFilterChange(event: any) {
    this.filter = event.detail.value;
    this.applyFilters();
  }

  applyFilters() {
    let filtered = [...this.tasks];

    // Apply status filter
    if (this.filter === 'pending') {
      filtered = filtered.filter(t => !t.completed);
    } else if (this.filter === 'completed') {
      filtered = filtered.filter(t => t.completed);
    }

    // Apply category filter
    if (this.categoryFilter) {
      filtered = filtered.filter(t => t.category === this.categoryFilter);
    }

    // Sort by date (newest first)
    filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    this.filteredTasks = filtered;
  }

  toggleComplete(task: Task) {
    this.taskService.toggleComplete(task.id);
    this.showToast(task.completed ? 'Tarea marcada como pendiente' : 'Tarea completada');
  }

  async confirmDelete(task: Task) {
    const alert = await this.alertController.create({
      header: 'Eliminar Tarea',
      message: `¿Estás seguro de que quieres eliminar "${task.title}"?`,
      cssClass: 'custom-alert',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Eliminar',
          role: 'destructive',
          handler: () => {
            this.deleteTask(task);
          }
        }
      ]
    });
    await alert.present();
  }

  deleteTask(task: Task) {
    this.taskService.deleteTask(task.id);
    this.showToast('Tarea eliminada');
  }

  async showToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'bottom',
      cssClass: 'custom-toast'
    });
    await toast.present();
  }

  getCategoryIcon(category: TaskCategory): string {
    const icons: Record<TaskCategory, string> = {
      trabajo: 'briefcase-outline',
      casa: 'home-outline',
      negocios: 'business-outline'
    };
    return icons[category];
  }

  getCategoryLabel(category: TaskCategory): string {
    const labels: Record<TaskCategory, string> = {
      trabajo: 'Trabajo',
      casa: 'Casa',
      negocios: 'Negocios'
    };
    return labels[category];
  }

  clearCategoryFilter() {
    this.categoryFilter = null;
    this.applyFilters();
  }

  getPageTitle(): string {
    if (this.categoryFilter) {
      return this.getCategoryLabel(this.categoryFilter);
    }
    return 'Mis Tareas';
  }
}
