import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MainButtonComponent } from './buttons/main-button/main-button.component';
import { LogoComponent } from './logos/logo/logo.component';
import { InputComponent } from './inputs/input/input.component';

@NgModule({
  declarations: [
    MainButtonComponent,
    LogoComponent,
    InputComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    
  ],
  exports: [
    MainButtonComponent,
    LogoComponent,
    InputComponent
  ],
  schemas: [NO_ERRORS_SCHEMA]
  
})
export class AtomsModule { }
