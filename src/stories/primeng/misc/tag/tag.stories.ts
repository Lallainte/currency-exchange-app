import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { TagModule } from 'primeng/tag';
import TagComponent from './tag.component';

// More on how to set up stories at: https://storybook.js.org/docs/angular/writing-stories/introduction
const meta: Meta<TagComponent> = {
    component: TagComponent,
    title: 'primeng/misc/tag/ Tag',
    tags: ['autodocs'],
    decorators: [
        moduleMetadata({
            imports: [TagModule],
        }),
    ],
    render: (args: TagComponent) => ({
        props: args,
    }),
};

export default meta;
type Story = StoryObj<TagComponent>;
export const Primary: Story = {
    render: (args: TagComponent) => ({
        props: args,
    }),
};
