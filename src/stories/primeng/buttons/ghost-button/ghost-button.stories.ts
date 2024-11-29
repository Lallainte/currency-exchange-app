import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { ButtonModule } from 'primeng/button';
import GhostButton from './ghost-button.component';

// More on how to set up stories at: https://storybook.js.org/docs/angular/writing-stories/introduction
const meta: Meta<GhostButton> = {
    component: GhostButton,
    title: "primeng/buttons/ghost-button/Ghost Button",
    tags: ['autodocs'],
    decorators: [
        moduleMetadata({
            imports: [ButtonModule],
        }),
    ],
    render: (args: GhostButton) => ({
        props: args,
    }),
};

export default meta;
type Story = StoryObj<GhostButton>;
export const Primary: Story = {
    render: (args: GhostButton) => ({
        props: args,
    }),
};