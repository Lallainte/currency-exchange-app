import { NgModule } from '@angular/core';

import { LoggerComponent } from '@shared/form/logger.component';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [
        LoggerComponent
    ],
    providers: [],
    exports: [
        LoggerComponent
    ],
})
export class FormModule {}
