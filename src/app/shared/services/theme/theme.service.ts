import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private isDarkMode: BehaviorSubject<boolean>;

  constructor() {
    const darkMode = localStorage.getItem('darkMode');
    this.isDarkMode = new BehaviorSubject<boolean>(darkMode ? JSON.parse(darkMode) : true);


    this.applyTheme();
  }

  getDarkMode() {
    return this.isDarkMode.asObservable();
  }

  toggleTheme() {
    const newValue = !this.isDarkMode.value;
    this.isDarkMode.next(newValue);
    localStorage.setItem('darkMode', JSON.stringify(newValue));

    this.applyTheme();
  }

  private applyTheme() {
    if (this.isDarkMode.value) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }
}