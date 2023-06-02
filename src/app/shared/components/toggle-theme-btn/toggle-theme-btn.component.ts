import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../../services/theme/theme.service';
import { AnimationOptions } from 'ngx-lottie';
import { AnimationItem } from 'lottie-web';

@Component({
  selector: 'app-toggle-theme-btn',
  templateUrl: './toggle-theme-btn.component.html',
  styleUrls: ['./toggle-theme-btn.component.css']
})
export class ToggleThemeBtnComponent implements OnInit{
  isDarkTheme: boolean = false;
  animationItem!: AnimationItem;
  constructor(private theme: ThemeService) { }
  options: AnimationOptions = {    
    path: '/assets/lottie/dark-mode-button.json',
    autoplay: false,
    loop: false

  };  
  ngOnInit(): void {
    this.theme.getDarkMode().subscribe(
      (res: boolean) => {
        this.isDarkTheme = res
        
      }

    )
  }

  toggleTheme(): void {
    this.theme.changeTheme();
    if(!this.isDarkTheme) {
      this.animationItem.playSegments([0, 255], true);
    }else{
      this.animationItem.playSegments([295, 481], true);
    }
  }

  onAnimate(animationItem: AnimationItem): void {    
    this.animationItem = animationItem;
    this.setInitialFrame();
    
  }
  setInitialFrame(): void {
    if (!this.animationItem) return;

    if (!this.isDarkTheme) {
      this.animationItem.goToAndStop(255, true); // Iniciar en el frame 255 para darkMode
    } else {
      this.animationItem.goToAndStop(0, true); // Iniciar en el frame 0 para lightMode
    }
  }
}
