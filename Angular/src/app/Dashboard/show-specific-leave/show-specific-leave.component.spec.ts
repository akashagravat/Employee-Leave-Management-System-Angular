import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowSpecificLeaveComponent } from './show-specific-leave.component';

describe('ShowSpecificLeaveComponent', () => {
  let component: ShowSpecificLeaveComponent;
  let fixture: ComponentFixture<ShowSpecificLeaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowSpecificLeaveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowSpecificLeaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
