import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';
import { ReportsComponent } from './pages/reports/reports.component';
import { WidgetComponent } from './components/widget/widget.component';
import { BigChartComponent } from './components/big-chart/big-chart.component';
import { SharedModule } from 'src/app/shared';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ReportsComponent,
    WidgetComponent,
    BigChartComponent
  ],
  imports: [
    CommonModule,
    ReportsRoutingModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  exports:[
    ReportsComponent,
    WidgetComponent,
    BigChartComponent,
  ]
})
export class ReportsModule { }
