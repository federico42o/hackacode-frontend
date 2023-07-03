import { Component, Input, OnInit } from '@angular/core';
import { Dataset } from 'src/app/models/dataset';

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.css'],
 
  
})
export class WidgetComponent implements OnInit {

  
  
  @Input() data!:Dataset;
  @Input() past!:Dataset;
  @Input() chartType!:string;
  isLoading:boolean = false;
  widgetData!:any;
  differenceEarnings!:number;

  ngOnInit(): void {

    
  }

  getPercentage(current:number,past:number):number{
    if(this.data && this.past){
      return Number(((current-past)/past*100))
    }
    return 0;
  }

}
