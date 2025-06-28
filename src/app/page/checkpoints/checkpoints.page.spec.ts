import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CheckpointsPage } from './checkpoints.page';

describe('CheckpointsPage', () => {
  let component: CheckpointsPage;
  let fixture: ComponentFixture<CheckpointsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CheckpointsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
