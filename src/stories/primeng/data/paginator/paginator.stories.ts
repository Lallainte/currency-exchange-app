import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { PaginatorModule } from 'primeng/paginator';
import { FormsModule } from '@angular/forms';
import PaginatorComponent from './paginator.component';

// More on how to set up stories at: https://storybook.js.org/docs/angular/writing-stories/introduction
const meta: Meta<PaginatorComponent> = {
    component: PaginatorComponent,
    title: 'primeng/data/paginator/Paginator',
    tags: ['autodocs'],
    decorators: [
        moduleMetadata({
            imports: [CommonModule, FormsModule, PaginatorModule],
        }),
    ],
    render: (args: PaginatorComponent) => ({
        props: args,
    }),
};

export default meta;
type Story = StoryObj<PaginatorComponent>;
export const Primary: Story = {
    render: (args: PaginatorComponent) => ({
        props: args,
    }),
};
