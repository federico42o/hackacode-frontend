import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';
import { ReportsComponent } from './pages/reports/reports.component';
import { WidgetComponent } from './components/widget/widget.component';
import { BigChartComponent } from './components/big-chart/big-chart.component';
import { SharedModule } from 'src/app/shared';
import { ReactiveFormsModule } from '@angular/forms';
import { LineSalesChartComponent } from './components/line-sales-chart/line-sales-chart.component';
import { BestBuyerComponent } from './components/best-buyer/best-buyer.component';
import { TopGameComponent } from './components/top-game/top-game.component';



@NgModule({
  declarations: [
    ReportsComponent,
    WidgetComponent,
    BigChartComponent,
    LineSalesChartComponent,
    BestBuyerComponent,
    TopGameComponent
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
    LineSalesChartComponent,
    BestBuyerComponent,
    TopGameComponent
  ]
})
export class ReportsModule { }
