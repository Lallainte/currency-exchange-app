import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { CommonModule } from '@angular/common';
import { TabMenuModule } from 'primeng/tabmenu';
import { FormsModule } from '@angular/forms';
import TabMenuComponent from './tab-menu.component';

// More on how to set up stories at: https://storybook.js.org/docs/angular/writing-stories/introduction
const meta: Meta<TabMenuComponent> = {
    component: TabMenuComponent,
    title: 'primeng/menu/tab-menu/Tab Menu',
    tags: ['autodocs'],
    decorators: [
        moduleMetadata({
            imports: [
                CommonModule,
                RouterTestingModule,
                FormsModule,
                TabMenuModule,
            ],
        }),
    ],
    render: (args: TabMenuComponent) => ({
        props: args,
    }),
};

export default meta;
type Story = StoryObj<TabMenuComponent>;
export const Primary: Story = {
    render: (args: TabMenuComponent) => ({
        props: args,
    }),
    args: {
        items: [
            { label: 'Home', icon: 'pi pi-fw pi-home' },
            { label: 'Calendar', icon: 'pi pi-fw pi-calendar' },
            { label: 'Edit', icon: 'pi pi-fw pi-pencil' },
            { label: 'Documentation', icon: 'pi pi-fw pi-file' },
            { label: 'Settings', icon: 'pi pi-fw pi-cog' },
        ],
    },
};
