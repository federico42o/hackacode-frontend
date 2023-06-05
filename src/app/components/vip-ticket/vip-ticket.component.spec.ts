import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VipTicketComponent } from './vip-ticket.component';

describe('VipTicketComponent', () => {
  let component: VipTicketComponent;
  let fixture: ComponentFixture<VipTicketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VipTicketComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VipTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
