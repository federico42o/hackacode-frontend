import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralTicketComponent } from './general-ticket.component';

describe('GeneralTicketComponent', () => {
  let component: GeneralTicketComponent;
  let fixture: ComponentFixture<GeneralTicketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneralTicketComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeneralTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
