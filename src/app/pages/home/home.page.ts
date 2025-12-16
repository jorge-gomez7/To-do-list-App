import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { 
  IonContent, 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonButton,
  IonIcon,
  IonFab,
  IonFabButton,
  IonRippleEffect
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { 
  addOutline, 
  checkmarkCircleOutline, 
  timeOutline,
  listOutline,
  briefcaseOutline,
  homeOutline,
  businessOutline,
  chevronForwardOutline
} from 'ionicons/icons';
import { Subscription } from 'rxjs';
import { TaskService } from '../../services/task.service';
import { TaskStats } from '../../models/task.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButton,
    IonIcon,
    IonFab,
    IonFabButton,
    IonRippleEffect
  ]
})
export class HomePage implements OnInit, OnDestroy {
  stats: TaskStats = {
    total: 0,
    pending: 0,
    completed: 0,
    byCategory: { trabajo: 0, casa: 0, negocios: 0 }
  };
  
  currentDate: string = '';
  greeting: string = '';
  private subscription!: Subscription;

  constructor(private taskService: TaskService) {
    addIcons({ 
      addOutline, 
      checkmarkCircleOutline, 
      timeOutline,
      listOutline,
      briefcaseOutline,
      homeOutline,
      businessOutline,
      chevronForwardOutline
    });
  }

  ngOnInit() {
    this.setGreeting();
    this.setCurrentDate();
    this.subscription = this.taskService.tasks$.subscribe(() => {
      this.stats = this.taskService.getStats();
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  private setGreeting() {
    const hour = new Date().getHours();
    if (hour < 12) {
      this.greeting = '¡Buenos días!';
    } else if (hour < 18) {
      this.greeting = '¡Buenas tardes!';
    } else {
      this.greeting = '¡Buenas noches!';
    }
  }

  private setCurrentDate() {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    this.currentDate = new Date().toLocaleDateString('es-ES', options);
  }

  get completionPercentage(): number {
    if (this.stats.total === 0) return 0;
    return Math.round((this.stats.completed / this.stats.total) * 100);
  }
}
