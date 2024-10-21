import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { MoleculesModule } from "../molecules/molecules.module";
import { AtomsModule } from "../atoms/atoms.module";
import { CategoryComponent } from "./category/category.component";
import { TemplatesModule } from "../templates/templates.module";
import { BrandComponent } from './brand/brand.component';

@NgModule({
    declarations:[
        CategoryComponent,
        BrandComponent
    ],
    imports:[
        CommonModule,
        TemplatesModule,
        MoleculesModule, 
        AtomsModule
    ]
})
export class PagesModule{}