import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBorrarLibroComponent } from './admin-borrar-libro.component';

describe('AdminBorrarLibroComponent', () => {
  let component: AdminBorrarLibroComponent;
  let fixture: ComponentFixture<AdminBorrarLibroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminBorrarLibroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminBorrarLibroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
