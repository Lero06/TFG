import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGestionErroresComponent } from './admin-gestion-errores.component';

describe('AdminGestionErroresComponent', () => {
  let component: AdminGestionErroresComponent;
  let fixture: ComponentFixture<AdminGestionErroresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminGestionErroresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminGestionErroresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
