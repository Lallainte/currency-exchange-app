import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { InputNumberModule } from 'primeng/inputnumber';
import InputNumber from './input-number.component';

// More on how to set up stories at: https://storybook.js.org/docs/angular/writing-stories/introduction
const meta: Meta<InputNumber> = {
    component: InputNumber,
    title: 'primeng/input-fields/input-number',
    tags: ['autodocs'],
    decorators: [
        moduleMetadata({
            imports: [InputNumberModule],
        }),
    ],
    render: (args: InputNumber) => ({
        props: args,
    }),
};

export default meta;
type Story = StoryObj<InputNumber>;
export const Primary: Story = {
    render: (args: InputNumber) => ({
        props: args,
    }),
};
