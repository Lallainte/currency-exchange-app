import type { Meta, StoryObj } from '@storybook/angular';
import { componentWrapperDecorator, moduleMetadata } from '@storybook/angular';
import { ButtonAddComponent } from './button-add.component';
import { ButtonModule } from 'primeng/button';

const meta: Meta<ButtonAddComponent> = {
    component: ButtonAddComponent,
    tags: ['autodocs'],
    decorators: [
        moduleMetadata({
            imports: [ButtonModule],
        }),
    ],
    render: (args: ButtonAddComponent) => ({
        props: args,
    }),
};

export default meta;
type Story = StoryObj<ButtonAddComponent>;
export const Primary: Story = {
    render: (args: ButtonAddComponent) => ({
        props: args,
    }),
};
