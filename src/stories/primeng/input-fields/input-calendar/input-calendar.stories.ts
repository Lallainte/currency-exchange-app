import {
    applicationConfig,
    moduleMetadata,
    type Meta,
    type StoryObj,
} from '@storybook/angular';
import { importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule } from 'primeng/calendar';
import InputCalendar from './input-calendar.component';

// More on how to set up stories at: https://storybook.js.org/docs/angular/writing-stories/introduction
const meta: Meta<InputCalendar> = {
    component: InputCalendar,
    title: 'primeng/input-fields/input-calendar',
    tags: ['autodocs'],
    decorators: [
        moduleMetadata({
            imports: [CalendarModule],
        }),
        applicationConfig({
            providers: [importProvidersFrom(BrowserAnimationsModule)],
        }),
    ],
    render: (args: InputCalendar) => ({
        props: args,
    }),
};

export default meta;
type Story = StoryObj<InputCalendar>;
export const Primary: Story = {
    render: (args: InputCalendar) => ({
        props: args,
    }),
};
