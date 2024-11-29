import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { FormsModule } from '@angular/forms';
import { ToggleComponent } from './toggle.component';
import { InputSwitchModule } from 'primeng/inputswitch';

// More on how to set up stories at: https://storybook.js.org/docs/angular/writing-stories/introduction
const meta: Meta<ToggleComponent> = {
    component: ToggleComponent,
    title: "primeng/controls/toggle/Toggle",
    tags: ['autodocs'],
    decorators: [
        moduleMetadata({
            imports: [InputSwitchModule, FormsModule]
        }),
    ],
    render: (args: ToggleComponent) => ({
        props: args,
    }),
};

export default meta;
type Story = StoryObj<ToggleComponent>;
export const Primary: Story = {
    render: (args: ToggleComponent) => ({
        props: args,
    }),
};