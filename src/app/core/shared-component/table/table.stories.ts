import type { Meta, StoryObj } from '@storybook/angular';
import { applicationConfig,componentWrapperDecorator, moduleMetadata } from '@storybook/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';
import { TableComponent } from './table.component';
import { TableModule } from 'primeng/table';
import { TableService } from './table.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LinovTableModule } from './table.module';
import { PipeModule } from '../../pipe/pipe.module';
import {
    HttpClientModule,
} from '@angular/common/http';

import { ApiService } from '../../service/api.service';
import { MessageService } from 'primeng/api';
import { MessageBoxService } from 'src/app/core/service/message-box.service';
import { HelperService } from 'src/app/core/service/helper-service';
import { loadavg } from 'os';
const meta: Meta<TableComponent> = {
    component: TableComponent,
    tags: ['autodocs'],
    decorators: [
        moduleMetadata({
            imports: [
                TableModule,
                FormsModule,
                CommonModule,
                LinovTableModule,
                PipeModule,
                HttpClientModule
            ],
            providers: [TableService,ApiService,MessageService,MessageBoxService,HelperService],
        }),
        applicationConfig({
            providers: [
              importProvidersFrom(BrowserAnimationsModule),
            ],
          })
    ],
    render: (args: TableComponent) => ({
        props: args,
    }),
};

export default meta;
type Story = StoryObj<TableComponent>;
export const Primary: Story = {
    render: (args: TableComponent) => ({
        props: args,
    }),
    args:{
        columMap:[{
            label: "Karyawan",
            key: "employee",
            isDate: false,
            isDateTimezone: false,
          },
          {
            label: "Tanggal",
            key: "date",
            isDate: true,
            isDateTimezone: false,
          },
          {
            label: "Masuk",
            key: "clockIn",
            isDate: false,
            isDateTimezone: true,
          },
          {
            label: "Keluar",
            key: "clockOut",
            isDate: false,
            isDateTimezone: true,
          },
          {
            label: "Lokasi",
            key: "location",
            isDate: false,
            isDateTimezone: false,
          },
          {
            label: "Sumber",
            key: "sourceType",
            isDate: false,
            isDateTimezone: false,
          }],
          loading:false,
          rowsPerPage:10,
          rowsPerPageOptions:[10,20,50],
          list:[
            {
                "id": "d573d7c4-aaa4-4437-91cf-b06dfa1a3512",
                "employee": "Dinah Hagenes",
                "date": "2022-08-01",
                "clockIn": "2022-08-01 01:04",
                "clockOut": "2022-08-01 11:49",
                "location": "-",
                "sourceType": "Admin",
                "status": "Pulang Awal",
                "version": 2
            },
            {
                "id": "cf973814-f5ad-4e9a-b92a-2b853b396725",
                "employee": "monsta",
                "date": "2022-09-14",
                "clockIn": "2022-09-14 06:50",
                "clockOut": "2022-09-14 06:51",
                "location": "Lawencon123",
                "sourceType": "Ess",
                "status": "Hadir",
                "version": 0
            },
            {
                "id": "f570515d-7c9c-4d59-bc8d-0179dc53c16e",
                "employee": "Farel M",
                "date": "2022-08-01",
                "clockIn": "2022-08-01 01:04",
                "clockOut": "2022-08-01 11:49",
                "location": "-",
                "sourceType": "Admin",
                "status": "Hadir",
                "version": 0
            },
            {
                "id": "22c3e2c8-7f89-49bb-ab1a-d3b8311b008c",
                "employee": "Erfan Pramudyana WIjaya",
                "date": "2022-08-01",
                "clockIn": "2022-08-01 01:23",
                "clockOut": "2022-08-01 11:23",
                "location": "-",
                "sourceType": "Admin",
                "status": "Hadir",
                "version": 0
            },
            {
                "id": "ce52903e-a235-4185-abcd-a0ecc82c4d83",
                "employee": "dwd",
                "date": "2022-08-01",
                "clockIn": "2022-08-01 04:20",
                "clockOut": null,
                "location": "PT Lawen",
                "sourceType": "Ess",
                "status": "Hadir",
                "version": 0
            },
            {
                "id": "46c22596-c857-449c-bcdd-0bdf8f3ddb8e",
                "employee": "Farel M",
                "date": "2022-07-28",
                "clockIn": "2022-07-28 01:00",
                "clockOut": "2022-07-28 11:09",
                "location": "-",
                "sourceType": "Admin",
                "status": "Hadir",
                "version": 0
            },
            {
                "id": "ca432931-5588-4e87-9888-5e836f772c93",
                "employee": "Asian Yard",
                "date": "2022-07-28",
                "clockIn": "2022-07-28 01:04",
                "clockOut": "2022-07-28 09:49",
                "location": "-",
                "sourceType": "Admin",
                "status": "Pulang Awal",
                "version": 0
            },
            {
                "id": "53bffc25-eb7a-424a-987d-c8a74eda0df0",
                "employee": "Febri",
                "date": "2022-07-27",
                "clockIn": "2022-07-27 06:38",
                "clockOut": "2022-07-27 06:44",
                "location": "-",
                "sourceType": "Admin",
                "status": "Hadir",
                "version": 0
            },
            {
                "id": "ad409533-56e8-466e-a789-62b1496f25f0",
                "employee": "Sulistiyani Ashfaq",
                "date": "2022-07-27",
                "clockIn": "2022-07-27 01:00",
                "clockOut": "2022-07-27 10:00",
                "location": "-",
                "sourceType": "Admin",
                "status": "Hadir",
                "version": 0
            },
            {
                "id": "dbf78ce5-1e0c-47dd-be3c-a1869d5fee9b",
                "employee": "Bondan Prakoso",
                "date": "2022-06-24",
                "clockIn": "2022-06-24 01:04",
                "clockOut": "2022-06-24 11:04",
                "location": "-",
                "sourceType": "Admin",
                "status": "Pulang Awal",
                "version": 0
            }
        ],
        count:71,

    }
};
