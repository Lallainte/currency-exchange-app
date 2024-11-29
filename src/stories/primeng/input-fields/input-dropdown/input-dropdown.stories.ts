import {
    applicationConfig,
    moduleMetadata,
    type Meta,
    type StoryObj,
} from '@storybook/angular';
import { importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DropdownModule } from 'primeng/dropdown';
import InputDropdown from './input-dropdown.component';

// More on how to set up stories at: https://storybook.js.org/docs/angular/writing-stories/introduction
const meta: Meta<InputDropdown> = {
    component: InputDropdown,
    title: 'primeng/input-fields/input-dropdown',
    tags: ['autodocs'],
    decorators: [
        moduleMetadata({
            imports: [DropdownModule],
        }),
        applicationConfig({
            providers: [importProvidersFrom(BrowserAnimationsModule)],
        }),
    ],
    render: (args: InputDropdown) => ({
        props: args,
    }),
};

export default meta;
type Story = StoryObj<InputDropdown>;
export const Primary: Story = {
    render: (args: InputDropdown) => ({
        props: args,
    }),
};
