import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LineSalesChartComponent } from './line-sales-chart.component';

describe('LineSalesChartComponent', () => {
  let component: LineSalesChartComponent;
  let fixture: ComponentFixture<LineSalesChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LineSalesChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LineSalesChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
