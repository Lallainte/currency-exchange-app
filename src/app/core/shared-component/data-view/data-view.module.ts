import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PipeModule } from '@core/pipe/pipe.module';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MenuModule } from 'primeng/menu';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { DataViewModule } from 'primeng/dataview';
import { LinovDataViewComponent } from './data-view.component';

@NgModule({
    imports: [
        CommonModule,
        DataViewModule,
        PipeModule,
        TieredMenuModule,
        OverlayPanelModule,
        ButtonModule,
        MenuModule,
        TranslateModule,
        FormsModule,
        InputTextareaModule,
        DialogModule,
        ConfirmDialogModule,
    ],
    exports: [LinovDataViewComponent],
    declarations: [LinovDataViewComponent],
})
export class LinovDataViewModule {}
