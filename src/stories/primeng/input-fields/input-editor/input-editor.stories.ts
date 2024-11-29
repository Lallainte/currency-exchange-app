import {
    applicationConfig,
    moduleMetadata,
    type Meta,
    type StoryObj,
} from '@storybook/angular';
import { EditorModule } from 'primeng/editor';
import InputEditor from './input-editor.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';

// More on how to set up stories at: https://storybook.js.org/docs/angular/writing-stories/introduction
const meta: Meta<InputEditor> = {
    component: InputEditor,
    title: 'primeng/input-fields/input-editor',
    tags: ['autodocs'],
    decorators: [
        moduleMetadata({
            imports: [EditorModule],
        }),
        applicationConfig({
            providers: [importProvidersFrom(BrowserAnimationsModule)],
        }),
    ],
    render: (args: InputEditor) => ({
        props: args,
    }),
};

export default meta;
type Story = StoryObj<InputEditor>;
export const Primary: Story = {
    render: (args: InputEditor) => ({
        props: args,
    }),
};
