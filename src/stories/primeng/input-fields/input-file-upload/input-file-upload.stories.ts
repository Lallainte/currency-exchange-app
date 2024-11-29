import {
    applicationConfig,
    moduleMetadata,
    type Meta,
    type StoryObj,
} from '@storybook/angular';
import { importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FileUploadModule } from 'primeng/fileupload';
import InputUpload from './input-file-upload.component';

// More on how to set up stories at: https://storybook.js.org/docs/angular/writing-stories/introduction
const meta: Meta<InputUpload> = {
    component: InputUpload,
    title: 'primeng/input-fields/input-file-upload',
    tags: ['autodocs'],
    decorators: [
        moduleMetadata({
            imports: [FileUploadModule],
        }),
        applicationConfig({
            providers: [importProvidersFrom(BrowserAnimationsModule)],
        }),
    ],
    render: (args: InputUpload) => ({
        props: args,
    }),
};

export default meta;
type Story = StoryObj<InputUpload>;
export const Primary: Story = {
    render: (args: InputUpload) => ({
        props: args,
    }),
};
