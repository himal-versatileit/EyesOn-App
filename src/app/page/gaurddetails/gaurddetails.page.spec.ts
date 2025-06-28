import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GaurddetailsPage } from './gaurddetails.page';

describe('GaurddetailsPage', () => {
  let component: GaurddetailsPage;
  let fixture: ComponentFixture<GaurddetailsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(GaurddetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
