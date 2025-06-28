import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GuarddashboardPage } from './guarddashboard.page';

describe('GuarddashboardPage', () => {
  let component: GuarddashboardPage;
  let fixture: ComponentFixture<GuarddashboardPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(GuarddashboardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
