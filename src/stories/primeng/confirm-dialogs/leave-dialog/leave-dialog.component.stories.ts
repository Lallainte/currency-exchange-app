import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LeaveDialogComponent } from './leave-dialog.component';

// More on how to set up stories at: https://storybook.js.org/docs/angular/writing-stories/introduction
const meta: Meta<LeaveDialogComponent> = {
    component: LeaveDialogComponent,
    title: "primeng/confirm-dialogs/leave-dialog/Leave Dialog",
    tags: ['autodocs'],
    decorators: [
        moduleMetadata({
            imports: [FormsModule, DialogModule, ButtonModule, BrowserAnimationsModule]
        }),
    ],
    render: (args: LeaveDialogComponent) => ({
        props: args,
    }),
};

export default meta;
type Story = StoryObj<LeaveDialogComponent>;
export const Primary: Story = {
    render: (args: LeaveDialogComponent) => ({
        props: args,
    }),
};