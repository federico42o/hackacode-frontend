import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopGameComponent } from './top-game.component';

describe('TopGameComponent', () => {
  let component: TopGameComponent;
  let fixture: ComponentFixture<TopGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopGameComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
