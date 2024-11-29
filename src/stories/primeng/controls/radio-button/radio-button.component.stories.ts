import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { RadioButtonComponent } from './radio-button.component';
import { RadioButtonModule } from 'primeng/radiobutton';

// More on how to set up stories at: https://storybook.js.org/docs/angular/writing-stories/introduction
const meta: Meta<RadioButtonComponent> = {
    component: RadioButtonComponent,
    title: "primeng/controls/radio-button/Radio Button",
    tags: ['autodocs'],
    decorators: [
        moduleMetadata({
            imports: [RadioButtonModule, FormsModule],
        }),
    ],
    render: (args: RadioButtonComponent) => ({
        props: args,
    }),
};

export default meta;
type Story = StoryObj<RadioButtonComponent>;
export const Primary: Story = {
    render: (args: RadioButtonComponent) => ({
        props: args,
    }),
};