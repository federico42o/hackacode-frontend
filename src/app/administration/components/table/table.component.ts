import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit{
  ngOnInit(): void {
  }
  
  @Input() headers!: string[];
  @Input() columns!: string[];
  @Input() data!: any[];
  @Input() actions!: boolean;
  
  pageSize!: any;
  page!: any[];



}
