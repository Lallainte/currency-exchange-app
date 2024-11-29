import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PipeModule } from '@core/pipe/pipe.module';
import { SharedComponentModule } from '@core/shared-component/shared-component.module';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { EditorModule } from 'primeng/editor';
import { PanelModule } from 'primeng/panel';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { GeneralComponentNotifications } from './pages/general/general.component';
import { ListComponentNotifications } from './pages/tabs/notifications/list/list.component';
import { ListComponentAnnouncements } from './pages/tabs/announcements/list/list.component';
import { TabListComponentNotifications } from './pages/list/list.component';
import { DetailComponentAnnouncements } from './pages/tabs/announcements/detail/detail.component';
import { DetailComponentNotifications } from './pages/tabs/notifications/detail/detail.component';
import { TabMenuModule } from 'primeng/tabmenu';
import { GridViewAnnouncementDisplayComponent } from './components/grid-view-announcement/grid-view.component';
import { DataViewModule } from 'primeng/dataview';
import { ListViewNotification } from './components/list-view-notification/list-view.component';
import { NotificationRoutingModule } from './notification-routing.module';
import { BadgeModule } from 'primeng/badge';
import { SkeletonModule } from 'primeng/skeleton';

@NgModule({
    imports: [
        CommonModule,
        PanelModule,
        RouterModule,
        SharedComponentModule,
        DropdownModule,
        CardModule,
        TieredMenuModule,
        CalendarModule,
        RadioButtonModule,
        EditorModule,
        DialogModule,
        PipeModule,
        TabMenuModule,
        DataViewModule,
        NotificationRoutingModule,
        BadgeModule,
        SkeletonModule,
    ],
    declarations: [
        GeneralComponentNotifications,
        ListComponentNotifications,
        ListComponentAnnouncements,
        TabListComponentNotifications,
        DetailComponentAnnouncements,
        DetailComponentNotifications,
        GridViewAnnouncementDisplayComponent,
        ListViewNotification,
    ],
})
export class NotificationsModule {}
