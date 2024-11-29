import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { BlocksComponent } from './components/blocks/blocks.component';
import { ButtonComponent } from './components/button/button.component';
import { ChartsComponent } from './components/charts/charts.component';
import { CrudComponent } from './components/crud/crud.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DocumentationComponent } from './components/documentation/documentation.component';
import { EmptyComponent } from './components/empty/empty.component';
import { FileComponent } from './components/file/file.component';
import { FloatLabelComponent } from './components/floatlabel/floatlabel.component';
import { FormLayoutComponent } from './components/formlayout/formlayout.component';
import { IconsComponent } from './components/icons/icons.component';
import { InputComponent } from './components/input/input.component';
import { InvalidStateComponent } from './components/invalidstate/invalidstate.component';
import { ListComponent } from './components/list/list.component';
import { MediaComponent } from './components/media/media.component';
import { MessagesComponent } from './components/messages/messages.component';
import { MiscComponent } from './components/misc/misc.component';
import { OverlaysComponent } from './components/overlays/overlays.component';
import { PanelsComponent } from './components/panels/panels.component';
import { TableComponent } from './components/table/table.component';
import { TimelineComponent } from './components/timeline/timeline.component';
import { TreeComponent } from './components/tree/tree.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {path: '', component: DashboardComponent},
            {path: 'uikit/formlayout', component: FormLayoutComponent},
            {path: 'uikit/input', component: InputComponent},
            {path: 'uikit/floatlabel', component: FloatLabelComponent},
            {path: 'uikit/invalidstate', component: InvalidStateComponent},
            {path: 'uikit/button', component: ButtonComponent},
            {path: 'uikit/table', component: TableComponent},
            {path: 'uikit/list', component: ListComponent},
            {path: 'uikit/tree', component: TreeComponent},
            {path: 'uikit/panel', component: PanelsComponent},
            {path: 'uikit/overlay', component: OverlaysComponent},
            {path: 'uikit/media', component: MediaComponent},
            {path: 'uikit/menu', loadChildren: () => import('./components/menus/menus.module').then(m => m.MenusModule)},
            {path: 'uikit/message', component: MessagesComponent},
            {path: 'uikit/misc', component: MiscComponent},
            {path: 'uikit/charts', component: ChartsComponent},
            {path: 'uikit/file', component: FileComponent},
            {path: 'pages/crud', component: CrudComponent},
            {path: 'pages/timeline', component: TimelineComponent},
            {path: 'pages/empty', component: EmptyComponent},
            {path: 'icons', component: IconsComponent},
            {path: 'blocks', component: BlocksComponent},
            {path: 'documentation', component: DocumentationComponent}
        ])
    ],
    exports: [RouterModule]
})
export class ShowcaseRoutingModule {
}
