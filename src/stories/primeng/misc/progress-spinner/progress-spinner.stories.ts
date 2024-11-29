import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import ProgressSpinnerComponent from './progress-spinner.component';

// More on how to set up stories at: https://storybook.js.org/docs/angular/writing-stories/introduction
const meta: Meta<ProgressSpinnerComponent> = {
    component: ProgressSpinnerComponent,
    title: 'primeng/misc/progress-spinner/Progress Spinner',
    tags: ['autodocs'],
    decorators: [
        moduleMetadata({
            imports: [ProgressSpinnerModule],
        }),
    ],
    render: (args: ProgressSpinnerComponent) => ({
        props: args,
    }),
};

export default meta;
type Story = StoryObj<ProgressSpinnerComponent>;
export const Primary: Story = {
    render: (args: ProgressSpinnerComponent) => ({
        props: args,
    }),
};
