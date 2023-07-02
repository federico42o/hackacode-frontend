import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';
import { ReportsComponent } from './pages/reports/reports.component';
import { WidgetComponent } from './components/widget/widget.component';


@NgModule({
  declarations: [
    ReportsComponent,
    WidgetComponent
  ],
  imports: [
    CommonModule,
    ReportsRoutingModule
  ],
  exports:[
    ReportsComponent,
    WidgetComponent
  ]
})
export class ReportsModule { }
