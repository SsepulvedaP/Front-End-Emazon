import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from './input.component';
import { AtomsModule } from '../../atoms.module'; // Importa AtomsModule
import { LABEL_TEXT, PLACEHOLDER_TEXT } from '../../../../shared/utils/constants/atoms-constants';

describe('InputComponent', () => {
  let component: InputComponent;
  let fixture: ComponentFixture<InputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InputComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        AtomsModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(InputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default label as LABEL_TEXT', () => {
    expect(component.label).toBe(LABEL_TEXT); // Usa la constante directamente
  });

  it('should have placeholder text as PLACEHOLDER_TEXT', () => {
    expect(component.placeholderText).toBe(PLACEHOLDER_TEXT); // Usa la constante directamente
  });

  // Agrega más pruebas aquí
});
