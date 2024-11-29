import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { CheckboxComponent } from './checkbox.component';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';

// More on how to set up stories at: https://storybook.js.org/docs/angular/writing-stories/introduction
const meta: Meta<CheckboxComponent> = {
    component: CheckboxComponent,
    title: "primeng/controls/checkbox/Checkbox",
    tags: ['autodocs'],
    decorators: [
        moduleMetadata({
            imports: [CheckboxModule, FormsModule],
        }),
    ],
    render: (args: CheckboxComponent) => ({
        props: args,
    }),
};

export default meta;
type Story = StoryObj<CheckboxComponent>;
export const Primary: Story = {
    render: (args: CheckboxComponent) => ({
        props: args,
    }),
};