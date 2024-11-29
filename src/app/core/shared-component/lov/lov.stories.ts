import type { Meta, StoryObj } from '@storybook/angular';
import { applicationConfig,componentWrapperDecorator, moduleMetadata } from '@storybook/angular';
import {
    HttpClientModule,
} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';
import { LovComponent } from './lov.component';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { ProgressBarModule } from 'primeng/progressbar';
import { LovModule } from './lov.module';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../service/api.service';
const meta: Meta<LovComponent> = {
    component: LovComponent,
    tags: ['autodocs'],
    decorators: [
        moduleMetadata({
            imports: [CommonModule,DropdownModule,FormsModule,LovModule,ProgressBarModule,HttpClientModule],
            providers: [ApiService]
        }),
        applicationConfig({
            providers: [
              importProvidersFrom(BrowserAnimationsModule),
            ],
          })
    ],

    render: (args: LovComponent) => ({
        props: args,
    }),
};

export default meta;
type Story = StoryObj<LovComponent>;
export const Primary: Story = {
    render: (args: LovComponent) => ({
        props: args,
    }),
};
