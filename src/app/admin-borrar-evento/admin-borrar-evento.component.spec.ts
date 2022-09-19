import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBorrarEventoComponent } from './admin-borrar-evento.component';

describe('AdminBajarEventoComponent', () => {
  let component: AdminBorrarEventoComponent;
  let fixture: ComponentFixture<AdminBorrarEventoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminBorrarEventoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminBorrarEventoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
