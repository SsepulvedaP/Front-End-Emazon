// card-form.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardFormComponent } from './card-form.component';
import { DataFormComponent } from '../../organisms/data-form/data-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AtomsModule } from '../../atoms/atoms.module';
import { MoleculesModule } from '../../molecules/molecules.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('CardFormComponent', () => {
  let component: CardFormComponent;
  let fixture: ComponentFixture<CardFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardFormComponent, DataFormComponent ],
      imports: [
        ReactiveFormsModule,     // Importa ReactiveFormsModule para FormBuilder
        AtomsModule,             // Importa AtomsModule si contiene componentes usados
        MoleculesModule,         // Importa MoleculesModule si contiene componentes usados
        HttpClientTestingModule  // Importa HttpClientTestingModule si se usa HttpClient
      ],
      providers: [],
      schemas: [CUSTOM_ELEMENTS_SCHEMA] // Opcional: Ignora elementos desconocidos
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
