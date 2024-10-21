import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AtomsModule } from "../atoms/atoms.module";
import { SearchInputComponent } from "./search-input/search-input.component";
import { ToastComponent } from './toast/toast.component';
import { ReactiveFormsModule } from "@angular/forms";
import { TableComponent } from './table/table.component';

@NgModule({
    declarations:[
        SearchInputComponent,
        ToastComponent,
        TableComponent,
    ],
    imports:[
        CommonModule,
        AtomsModule,
        ReactiveFormsModule
    ],
    exports:[
        SearchInputComponent,
        ToastComponent,
        TableComponent,
    ]
})
export class MoleculesModule{}