import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadStudentComponent } from './read-student.component';

describe('ReadStudentComponent', () => {
  let component: ReadStudentComponent;
  let fixture: ComponentFixture<ReadStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReadStudentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ReadStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
