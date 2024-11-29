import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { InputTextareaModule } from 'primeng/inputtextarea';
import InputTextArea from './input-text-area.component';

// More on how to set up stories at: https://storybook.js.org/docs/angular/writing-stories/introduction
const meta: Meta<InputTextArea> = {
    component: InputTextArea,
    title: 'primeng/input-fields/input-text-area',
    tags: ['autodocs'],
    decorators: [
        moduleMetadata({
            imports: [InputTextareaModule],
        }),
    ],
    render: (args: InputTextArea) => ({
        props: args,
    }),
};

export default meta;
type Story = StoryObj<InputTextArea>;
export const Primary: Story = {
    render: (args: InputTextArea) => ({
        props: args,
    }),
};
