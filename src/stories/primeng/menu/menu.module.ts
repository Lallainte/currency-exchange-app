import { NgModule } from '@angular/core';
// import { TabMenuComponentModule } from './tab-menu/tab-menu.module';
import { CommonModule } from '@angular/common';
import { TabMenuModule } from 'primeng/tabmenu';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import TabMenuComponent from './tab-menu/tab-menu.component';
import { ShowcaseModule } from 'src/app/showcase/showcase.module';
ShowcaseModule;

@NgModule({
    // declarations: [TabMenuComponent],
    declarations: [],
    // imports: [TabMenuComponentModule],
    imports: [],
    // imports: [CommonModule, RouterModule, FormsModule, ShowcaseModule],
    // exports: [TabMenuComponent],
    exports: [],
})
export class MenuComponentModule {}
