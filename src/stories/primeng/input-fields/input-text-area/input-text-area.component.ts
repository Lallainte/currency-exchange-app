import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'c-inputTextArea',
    template: `<textarea
        rows="5"
        cols="30"
        pInputTextarea
        placeholder="Input Text Area"
    ></textarea>`,
    styleUrls: [],
})
export default class InputTextArea {}
