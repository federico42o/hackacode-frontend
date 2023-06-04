import { Component } from '@angular/core';

@Component({
  selector: 'app-clock',
  template: '{{currentTime }}',
  styleUrls: ['./clock.component.css']
})
export class ClockComponent {
  currentTime!: string;

  ngOnInit() {
    this.updateTime();
    setInterval(() => {
      this.updateTime();
    }, 1000);
  }

  updateTime() {
    const date = new Date();
    this.currentTime = date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  }

}
