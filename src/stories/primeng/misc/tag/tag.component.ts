import { Component } from '@angular/core';

@Component({
    selector: 'c-tag',
    template: `<div class="card flex justify-content-center gap-2">
        <p-tag value="Primary"></p-tag>
        <p-tag severity="success" value="Success"></p-tag>
        <p-tag severity="info" value="Info"></p-tag>
        <p-tag severity="warning" value="Warning"></p-tag>
        <p-tag severity="danger" value="Danger"></p-tag>
    </div>`,
    styleUrls: [],
})
export default class TagComponent {}
