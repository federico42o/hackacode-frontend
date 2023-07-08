import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clock',
  template: '{{currentTime }}',
  styleUrls: ['./clock.component.css']
})
export class ClockComponent implements OnInit{
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
