import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'c-inputText',
    template: `<input type="text" pInputText placeholder="Input Text" />`,
    styleUrls: [],
})
export default class InputText {}
