import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { DataFormComponent } from './data-form.component';
import { AtomsModule } from '../../atoms/atoms.module'; 
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('DataFormComponent', () => {
  let component: DataFormComponent;
  let fixture: ComponentFixture<DataFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DataFormComponent],
      imports: [ReactiveFormsModule, AtomsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA] // Usado para evitar errores de elementos desconocidos
    }).compileComponents();

    fixture = TestBed.createComponent(DataFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default name label as "Name"', () => {
    expect(component.nameLabel).toBe('Name');
  });

  it('should initialize form with name and description controls', () => {
    expect(component.form.contains(component.name)).toBeTruthy();
    expect(component.form.contains(component.description)).toBeTruthy();
  });

  it('should require name and description', () => {
    const nameControl = component.form.get(component.name);
    const descriptionControl = component.form.get(component.description);

    nameControl?.setValue('');
    descriptionControl?.setValue('');

    expect(nameControl?.valid).toBeFalsy();
    expect(descriptionControl?.valid).toBeFalsy();
    expect(component.getNameErrorMessage()).toBe('Name is required');
    expect(component.getDescriptionErrorMessage()).toBe('Description is required');
  });

  it('should validate max length for name and description', () => {
    const nameControl = component.form.get(component.name);
    const descriptionControl = component.form.get(component.description);

    nameControl?.setValue('a'.repeat(51)); // Excede los 50 caracteres
    descriptionControl?.setValue('a'.repeat(121)); // Excede los 120 caracteres

    expect(nameControl?.valid).toBeFalsy();
    expect(descriptionControl?.valid).toBeFalsy();
    expect(component.getNameErrorMessage()).toBe('Name cannot exceed 50 characters');
    expect(component.getDescriptionErrorMessage()).toBe('Description cannot exceed 120 characters');
  });

  it('should emit form data on submit when valid', () => {
    const formData = { name: 'Valid Name', description: 'Valid description' };
    jest.spyOn(component.submitForm, 'emit');

    component.form.setValue(formData);
    component.onSubmit();

    expect(component.submitForm.emit).toHaveBeenCalledWith(formData);
  });

  it('should not emit form data on submit when invalid', () => {
    jest.spyOn(component.submitForm, 'emit');
    component.form.setValue({ name: '', description: '' }); // Formulario inválido

    component.onSubmit();

    expect(component.submitForm.emit).not.toHaveBeenCalled();
  });

  it('should reset form when resetForm is called', () => {
    component.form.setValue({ name: 'Test', description: 'Test description' });
    expect(component.form.value).toEqual({ name: 'Test', description: 'Test description' });

    component.resetForm();
    expect(component.form.value).toEqual({ name: null, description: null });
  });

  it('should return error message for empty name', () => {
    const nameControl = component.form.get(component.name);
    nameControl?.setValue('');
    expect(component.getNameErrorMessage()).toBe('Name is required');
  });

  it('should return error message for name exceeding max length', () => {
    const nameControl = component.form.get(component.name);
    nameControl?.setValue('a'.repeat(51));
    expect(component.getNameErrorMessage()).toBe('Name cannot exceed 50 characters');
  });

  it('should return error message for empty description', () => {
    const descriptionControl = component.form.get(component.description);
    descriptionControl?.setValue('');
    expect(component.getDescriptionErrorMessage()).toBe('Description is required');
  });

  it('should return error message for description exceeding max length', () => {
    const descriptionControl = component.form.get(component.description);
    descriptionControl?.setValue('a'.repeat(121));
    expect(component.getDescriptionErrorMessage()).toBe('Description cannot exceed 120 characters');
  });
});
