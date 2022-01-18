import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionMessComponent } from './gestion-mess.component';

describe('GestionMessComponent', () => {
  let component: GestionMessComponent;
  let fixture: ComponentFixture<GestionMessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionMessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionMessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
