import {
    FormArray,
    FormGroup,
    ValidatorFn,
    AbstractControl,
} from '@angular/forms';

export function formatDate(value: string, fullDay?: boolean): string {
    if (!value) {
        return '';
    }

    if (value.includes('Tundefined')) {
        value = value.replace('Tundefined', '');
    }

    let [day, month, date, year, time] = new Date(value).toString().split(' ');

    if (value) {
        date.padStart(2, '0');
    }

    if (fullDay) {
        return `${day}, ${date} ${month} ${year}`;
    }

    const [hour, minute] = time.split(':');

    return `${day}, ${date} ${month} ${year}, ${hour}:${minute}`;
}

export function getStartAndEnd(valStart: string, valEnd: string) {
    const end = valEnd.substring(valEnd.length - 6);
    const start = valStart.substring(valStart.length - 6);

    return `${start} - ${end}`;
}

export function getTime(data: any): string {
    return getStartAndEnd(formatDate(data.startTime), formatDate(data.endTime));
}

export function extractDayMonthYear(value = new Date()): {
    date: number;
    year: number;
    month: number;
} {
    const [month, date, year] = value.toLocaleDateString('en').split('/');

    return {
        date: +date,
        year: +year,
        month: +month,
    };
}

function compareControlDateWithKey(
    type: 'greaterThan' | 'lessThan',
    key: string,
    control: AbstractControl
) {
    const parent: FormGroup<any> | FormArray<any> = control?.parent;

    if (!parent) {
        return null;
    }

    const compareValue = parent.get(key).value;

    if (!compareValue) {
        return null;
    }

    if (compareValue > control.value && type === 'greaterThan') {
        if (!control.value) {
            return null;
        }

        return { dateGreaterThan: true };
    }

    if (compareValue < control.value && type === 'lessThan') {
        if (!control.value) {
            return null;
        }

        return { dateLessThan: true };
    }

    return null;
}

export function compareDate(
    type: 'greaterThan' | 'lessThan',
    key: string
): ValidatorFn {
    return (control: AbstractControl) =>
        compareControlDateWithKey(type, key, control);
}
