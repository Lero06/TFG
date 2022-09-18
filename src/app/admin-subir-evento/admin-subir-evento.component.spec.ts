import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSubirEventoComponent } from './admin-subir-evento.component';

describe('AdminSubirEventoComponent', () => {
  let component: AdminSubirEventoComponent;
  let fixture: ComponentFixture<AdminSubirEventoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminSubirEventoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminSubirEventoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
