import { NgModule } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { RouterModule } from '@angular/router';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { SkeletonModule } from 'primeng/skeleton';
import { CalendarModule } from 'primeng/calendar';
import { MessageService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { HelpersLogHistory } from './helper/helpers';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { UserSelectComponent } from './shared/components/app-user-select/users-select.component';
import { SharedComponentModule } from '@core/shared-component/shared-component.module';
import { CommonModule, DatePipe } from '@angular/common';
import { ListComponentLogHistory } from './pages/list/list.component';
import { InfiniteScrollDirective } from './directive/infinite-scroll.directive';
import { DateRangePickerComponent } from './shared/components/date-range-picker/date-range-picker.component';
import { DetailComponentLogHistory } from './pages/detail/detail.component';
import { GeneralComponentLogHistory } from './pages/general/general.component';
import { LogHistoryRoutingModule } from './log-history.routing.module';
import { SettingsComponentLogHistory } from './pages/settings/settings.component';

@NgModule({
    imports: [
        CommonModule,
        SharedComponentModule,
        RouterModule,
        InputTextModule,
        CalendarModule,
        ButtonModule,
        AvatarModule,
        SkeletonModule,
        OverlayPanelModule,
        DialogModule,
        ToastModule,
        LogHistoryRoutingModule
    ],
    declarations: [
        ListComponentLogHistory,
        GeneralComponentLogHistory,
        InfiniteScrollDirective,
        DetailComponentLogHistory,
        DateRangePickerComponent,
        UserSelectComponent,
        SettingsComponentLogHistory
    ],
    providers: [DatePipe, HelpersLogHistory, MessageService],
})
export class LogHistoryModule {}
