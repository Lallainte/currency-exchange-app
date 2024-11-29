import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppConfigComponent } from './component/app.config.component';
import { AppFooterComponent } from './component/app.footer.component';
import { AppMainComponent } from './component/app.main.component';
import { AppMenuComponent } from './component/app.menu.component';
import { AppMenuitemComponent } from './component/app.menuitem.component';
import { AppTopBarComponent } from './component/app.topbar.component';
import { ConfigService } from '../core/service/app.config.service';
import { MenuService } from '../showcase/service/app.menu.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { NgxSpinnerModule } from 'ngx-spinner';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PageForbiddenComponent } from './page-forbidden/page-forbidden.component';
import { LoginComponent } from './login/login.component';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { SharedComponentModule } from '../core/shared-component/shared-component.module';
import { GalleriaModule } from 'primeng/galleria';
import { RedirectComponent } from './redirect/redirect.component';
import { MenubarModule } from 'primeng/menubar';
import { MultiSelectModule } from 'primeng/multiselect';
import { CarouselModule } from 'primeng/carousel';
import { AppSubMenuComponent } from './component/app.submenu.component';
import { ScrollTopModule } from 'primeng/scrolltop';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { FlashMessageModule } from '@shared/flash-message/flash-message.module';
import { ImageModule } from 'primeng/image';
import { PipeModule } from '@core/pipe/pipe.module';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { PrivacyPoliciesComponent } from '../layout/privacy-policies/privacy-policies.component';
import { TabViewModule } from 'primeng/tabview';
import { BadgeModule } from 'primeng/badge';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CheckboxModule } from 'primeng/checkbox';
import { ConfirmationService } from 'primeng/api';

@NgModule({
    declarations: [
        AppMainComponent,
        AppTopBarComponent,
        AppFooterComponent,
        AppConfigComponent,
        AppMenuComponent,
        AppMenuitemComponent,
        PageNotFoundComponent,
        PageForbiddenComponent,
        LoginComponent,
        RedirectComponent,
        AppSubMenuComponent,
        ForgotPasswordComponent,
        PrivacyPoliciesComponent,
    ],
    imports: [
        AutoCompleteModule,
        RouterModule,
        CommonModule,
        FormsModule,
        InputSwitchModule,
        ButtonModule,
        NgxSpinnerModule,
        InputTextModule,
        PasswordModule,
        ReactiveFormsModule,
        SharedComponentModule,
        GalleriaModule,
        MenubarModule,
        MultiSelectModule,
        CarouselModule,
        ScrollTopModule,
        TieredMenuModule,
        FlashMessageModule,
        DialogModule,
        ImageModule,
        PipeModule,
        TabViewModule,
        BadgeModule,
        ConfirmDialogModule,
        CheckboxModule,
    ],
    providers: [MenuService, ConfigService, ConfirmationService],
})
export class LayoutModule {}
