import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../../services/theme/theme.service';

@Component({
  selector: 'app-toggle-theme-btn',
  templateUrl: './toggle-theme-btn.component.html',
  styleUrls: ['./toggle-theme-btn.component.css']
})
export class ToggleThemeBtnComponent implements OnInit{
  isDarkTheme: boolean = false;
  constructor(private theme: ThemeService) { }
  ngOnInit(): void {
    this.theme.getDarkMode().subscribe(
      (res: boolean) => this.isDarkTheme = res
    )
  }

  toggleTheme(): void {
    this.theme.changeTheme();
  }

}
