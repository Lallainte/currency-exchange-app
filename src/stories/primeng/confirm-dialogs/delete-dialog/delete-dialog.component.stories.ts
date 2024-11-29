import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DeleteDialogComponent } from './delete-dialog.component';

// More on how to set up stories at: https://storybook.js.org/docs/angular/writing-stories/introduction
const meta: Meta<DeleteDialogComponent> = {
    component: DeleteDialogComponent,
    title: "primeng/confirm-dialogs/delete-dialog/Delete Dialog",
    tags: ['autodocs'],
    decorators: [
        moduleMetadata({
            imports: [FormsModule, DialogModule, ButtonModule, BrowserAnimationsModule]
        }),
    ],
    render: (args: DeleteDialogComponent) => ({
        props: args,
    }),
};

export default meta;
type Story = StoryObj<DeleteDialogComponent>;
export const Primary: Story = {
    render: (args: DeleteDialogComponent) => ({
        props: args,
    }),
};