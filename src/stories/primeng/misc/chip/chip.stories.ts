import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { ChipModule } from 'primeng/chip';
import ChipComponent from './chip.component';

// More on how to set up stories at: https://storybook.js.org/docs/angular/writing-stories/introduction
const meta: Meta<ChipComponent> = {
    component: ChipComponent,
    title: 'primeng/misc/chip/ Chip',
    tags: ['autodocs'],
    decorators: [
        moduleMetadata({
            imports: [ChipModule],
        }),
    ],
    render: (args: ChipComponent) => ({
        props: args,
    }),
};

export default meta;
type Story = StoryObj<ChipComponent>;
export const Primary: Story = {
    render: (args: ChipComponent) => ({
        props: args,
    }),
};
