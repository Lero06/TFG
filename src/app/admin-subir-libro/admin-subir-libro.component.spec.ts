import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSubirLibroComponent } from './admin-subir-libro.component';

describe('AdminSubirLibroComponent', () => {
  let component: AdminSubirLibroComponent;
  let fixture: ComponentFixture<AdminSubirLibroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminSubirLibroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminSubirLibroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
