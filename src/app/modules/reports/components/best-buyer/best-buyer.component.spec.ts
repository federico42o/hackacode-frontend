import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BestBuyerComponent } from './best-buyer.component';

describe('BestBuyerComponent', () => {
  let component: BestBuyerComponent;
  let fixture: ComponentFixture<BestBuyerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BestBuyerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BestBuyerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
