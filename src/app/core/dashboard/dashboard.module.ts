import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { FormsModule } from '@angular/forms';
import { SharedComponentModule } from '../shared-component/shared-component.module';
import { TabViewModule } from 'primeng/tabview';
import { CardModule } from 'primeng/card';
import { InfiniteScrollModule } from "ngx-infinite-scroll";

@NgModule({
    declarations: [
        DashboardComponent,
    ],
    imports: [
        CommonModule,
        NgApexchartsModule,
        FormsModule,
        SharedComponentModule,
        TabViewModule,
        CardModule,
        InfiniteScrollModule
    ],
})
export class DashboardModule {}
