import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllLeaveComponent } from './view-all-leave.component';

describe('ViewAllLeaveComponent', () => {
  let component: ViewAllLeaveComponent;
  let fixture: ComponentFixture<ViewAllLeaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewAllLeaveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAllLeaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
