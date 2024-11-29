import {
    applicationConfig,
    moduleMetadata,
    type Meta,
    type StoryObj,
} from '@storybook/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PickListModule } from 'primeng/picklist';
import PickListComponent from './pick-list.component';
import { ProductService } from './service/productservice';

// More on how to set up stories at: https://storybook.js.org/docs/angular/writing-stories/introduction
const meta: Meta<PickListComponent> = {
    component: PickListComponent,
    title: 'primeng/data/pick-list/PickList',
    tags: ['autodocs'],
    decorators: [
        moduleMetadata({
            imports: [
                CommonModule,
                FormsModule,
                HttpClientModule,
                PickListModule,
            ],
            providers: [ProductService],
        }),
        applicationConfig({
            providers: [importProvidersFrom(BrowserAnimationsModule)],
        }),
    ],
    render: (args: PickListComponent) => ({
        props: args,
    }),
};

export default meta;
type Story = StoryObj<PickListComponent>;
export const Primary: Story = {
    render: (args: PickListComponent) => ({
        props: args,
    }),
};
