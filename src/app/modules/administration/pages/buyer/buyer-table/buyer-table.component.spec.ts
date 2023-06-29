import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyerTableComponent } from './buyer-table.component';

describe('BuyerTableComponent', () => {
  let component: BuyerTableComponent;
  let fixture: ComponentFixture<BuyerTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuyerTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuyerTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
