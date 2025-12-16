import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonBackButton,
  IonButton,
  IonIcon,
  IonInput,
  IonTextarea,
  IonItem,
  IonLabel,
  IonRippleEffect,
  ToastController
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  briefcaseOutline,
  homeOutline,
  businessOutline,
  checkmarkOutline,
  saveOutline
} from 'ionicons/icons';
import { TaskService } from '../../services/task.service';
import { TaskCategory } from '../../models/task.model';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.page.html',
  styleUrls: ['./add-task.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonBackButton,
    IonButton,
    IonIcon,
    IonInput,
    IonTextarea,
    IonItem,
    IonLabel,
    IonRippleEffect
  ]
})
export class AddTaskPage {
  title: string = '';
  description: string = '';
  category: TaskCategory = 'trabajo';

  categories: { value: TaskCategory; label: string; icon: string }[] = [
    { value: 'trabajo', label: 'Trabajo', icon: 'briefcase-outline' },
    { value: 'casa', label: 'Casa', icon: 'home-outline' },
    { value: 'negocios', label: 'Negocios', icon: 'business-outline' }
  ];

  constructor(
    private taskService: TaskService,
    private router: Router,
    private toastController: ToastController
  ) {
    addIcons({
      briefcaseOutline,
      homeOutline,
      businessOutline,
      checkmarkOutline,
      saveOutline
    });
  }

  selectCategory(cat: TaskCategory) {
    this.category = cat;
  }

  async saveTask() {
    if (!this.title.trim()) {
      this.showToast('Por favor ingresa un título');
      return;
    }

    if (!this.description.trim()) {
      this.showToast('Por favor ingresa una descripción');
      return;
    }

    this.taskService.addTask(this.title.trim(), this.description.trim(), this.category);
    await this.showToast('Tarea creada exitosamente');
    this.router.navigate(['/task-list']);
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

  isValid(): boolean {
    return this.title.trim().length > 0 && this.description.trim().length > 0;
  }
}
