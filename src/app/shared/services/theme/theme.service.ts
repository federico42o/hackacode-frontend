import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private isDarkMode : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() { } 

  getDarkMode(){
    return this.isDarkMode.asObservable();
  }

  changeTheme(){
    if(this.isDarkMode.value){

      document.documentElement.classList.add('dark');
      this.isDarkMode.next(!this.isDarkMode.value);
      localStorage.setItem('darkMode', JSON.stringify(this.isDarkMode.value));
    }else{
      document.documentElement.classList.remove('dark');
      this.isDarkMode.next(!this.isDarkMode.value);
      localStorage.setItem('darkMode', JSON.stringify(this.isDarkMode.value));
    }
  }
}
