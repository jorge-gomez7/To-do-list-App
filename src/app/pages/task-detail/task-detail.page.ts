import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonBackButton,
  IonButton,
  IonIcon,
  IonRippleEffect,
  AlertController,
  ToastController
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  briefcaseOutline,
  homeOutline,
  businessOutline,
  checkmarkCircleOutline,
  checkmarkCircle,
  trashOutline,
  calendarOutline,
  timeOutline,
  documentTextOutline
} from 'ionicons/icons';
import { TaskService } from '../../services/task.service';
import { Task, TaskCategory } from '../../models/task.model';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.page.html',
  styleUrls: ['./task-detail.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonBackButton,
    IonButton,
    IonIcon,
    IonRippleEffect
  ]
})
export class TaskDetailPage implements OnInit {
  task: Task | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private taskService: TaskService,
    private alertController: AlertController,
    private toastController: ToastController
  ) {
    addIcons({
      briefcaseOutline,
      homeOutline,
      businessOutline,
      checkmarkCircleOutline,
      checkmarkCircle,
      trashOutline,
      calendarOutline,
      timeOutline,
      documentTextOutline
    });
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.task = this.taskService.getTaskById(id);
      if (!this.task) {
        this.router.navigate(['/task-list']);
      }
    }
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

  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  toggleComplete() {
    if (this.task) {
      this.taskService.toggleComplete(this.task.id);
      this.task = this.taskService.getTaskById(this.task.id);
      this.showToast(this.task?.completed ? 'Tarea completada' : 'Tarea marcada como pendiente');
    }
  }

  async confirmDelete() {
    if (!this.task) return;

    const alert = await this.alertController.create({
      header: 'Eliminar Tarea',
      message: `¿Estás seguro de que quieres eliminar "${this.task.title}"?`,
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
            this.deleteTask();
          }
        }
      ]
    });
    await alert.present();
  }

  deleteTask() {
    if (this.task) {
      this.taskService.deleteTask(this.task.id);
      this.showToast('Tarea eliminada');
      this.router.navigate(['/task-list']);
    }
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
}
