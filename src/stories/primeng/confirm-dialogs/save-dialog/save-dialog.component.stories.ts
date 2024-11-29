import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { SaveDialogComponent } from './save-dialog.component';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// More on how to set up stories at: https://storybook.js.org/docs/angular/writing-stories/introduction
const meta: Meta<SaveDialogComponent> = {
    component: SaveDialogComponent,
    title: "primeng/confirm-dialogs/save-dialog/Save Dialog",
    tags: ['autodocs'],
    decorators: [
        moduleMetadata({
            imports: [FormsModule, DialogModule, ButtonModule, BrowserAnimationsModule]
        }),
    ],
    render: (args: SaveDialogComponent) => ({
        props: args,
    }),
};

export default meta;
type Story = StoryObj<SaveDialogComponent>;
export const Primary: Story = {
    render: (args: SaveDialogComponent) => ({
        props: args,
    }),
};