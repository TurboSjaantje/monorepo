import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadTeacherComponent } from './read-teacher.component';

describe('ReadTeacherComponent', () => {
  let component: ReadTeacherComponent;
  let fixture: ComponentFixture<ReadTeacherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReadTeacherComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ReadTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
