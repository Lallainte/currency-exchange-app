import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import MainButton from './main-button.component'
import { ButtonModule } from 'primeng/button';

// More on how to set up stories at: https://storybook.js.org/docs/angular/writing-stories/introduction
const meta: Meta<MainButton> = {
    component: MainButton,
    title: "primeng/buttons/main-button/Main Button",
    tags: ['autodocs'],
    decorators: [
        moduleMetadata({
            imports: [ButtonModule],
        }),
    ],
    render: (args: MainButton) => ({
        props: args,
    }),
};

export default meta;
type Story = StoryObj<MainButton>;
export const Primary: Story = {
    render: (args: MainButton) => ({
        props: args,
    }),
};