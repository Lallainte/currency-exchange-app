export function generateId(): string {
    return Math.random().toString(16).slice(2);
}

export function toTitleCase(value: string): string {
    return value.replace(/\w\S*/g, (txt) => {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

export function isElement(type: string): boolean {
    return ['Form', 'Table'].includes(type);
}

export function isField(type: string): boolean {
    return [
        'Radio',
        'Number',
        'Switch',
        'Checkbox',
        'Dropdown',
        'Textarea',
        'Attachment',
        'Input Text',
        'Attachement',
        'Date & Time',
    ].includes(type);
}
