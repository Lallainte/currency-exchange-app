import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UpdateDialogComponent } from './update-dialog.component';

// More on how to set up stories at: https://storybook.js.org/docs/angular/writing-stories/introduction
const meta: Meta<UpdateDialogComponent> = {
    component: UpdateDialogComponent,
    title: "primeng/confirm-dialogs/update-dialog/Update Dialog",
    tags: ['autodocs'],
    decorators: [
        moduleMetadata({
            imports: [FormsModule, DialogModule, ButtonModule, BrowserAnimationsModule]
        }),
    ],
    render: (args: UpdateDialogComponent) => ({
        props: args,
    }),
};

export default meta;
type Story = StoryObj<UpdateDialogComponent>;
export const Primary: Story = {
    render: (args: UpdateDialogComponent) => ({
        props: args,
    }),
};