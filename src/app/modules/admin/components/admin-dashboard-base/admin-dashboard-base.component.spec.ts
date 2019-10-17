import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDashboardBaseComponent } from './admin-dashboard-base.component';

describe('AdminDashboardBaseComponent', () => {
  let component: AdminDashboardBaseComponent;
  let fixture: ComponentFixture<AdminDashboardBaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminDashboardBaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDashboardBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
