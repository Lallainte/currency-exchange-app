import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { InputTextModule } from 'primeng/inputtext';
import InputText from './input-text.component';

// More on how to set up stories at: https://storybook.js.org/docs/angular/writing-stories/introduction
const meta: Meta<InputText> = {
    component: InputText,
    title: 'primeng/input-fields/input-text',
    tags: ['autodocs'],
    decorators: [
        moduleMetadata({
            imports: [InputTextModule],
        }),
    ],
    render: (args: InputText) => ({
        props: args,
    }),
};

export default meta;
type Story = StoryObj<InputText>;
export const Primary: Story = {
    render: (args: InputText) => ({
        props: args,
    }),
};
