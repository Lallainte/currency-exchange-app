import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { CardModule } from 'primeng/card';
import CardComponent from './card.component';

// More on how to set up stories at: https://storybook.js.org/docs/angular/writing-stories/introduction
const meta: Meta<CardComponent> = {
    component: CardComponent,
    title: 'primeng/card/ Card',
    tags: ['autodocs'],
    decorators: [
        moduleMetadata({
            imports: [CardModule],
        }),
    ],
    render: (args: CardComponent) => ({
        props: args,
    }),
};

export default meta;
type Story = StoryObj<CardComponent>;
export const Primary: Story = {
    render: (args: CardComponent) => ({
        props: args,
    }),
};
