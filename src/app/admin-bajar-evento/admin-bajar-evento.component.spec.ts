import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBajarEventoComponent } from './admin-bajar-evento.component';

describe('AdminBajarEventoComponent', () => {
  let component: AdminBajarEventoComponent;
  let fixture: ComponentFixture<AdminBajarEventoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminBajarEventoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminBajarEventoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
