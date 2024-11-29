import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class HelpersLogHistory {
    keysToRemove = [
        'createdAt',
        'createdBy',
        'updatedAt',
        'updatedBy',
        'version',
        'id',
    ];

    public lovModule = [
        {
            id: 'career-path',
            name: 'Career Path',
        },
        {
            id: 'competency',
            name: 'Competency',
        },
        {
            id: 'core',
            name: 'Core',
        },
        {
            id: 'learning-and-development',
            name: 'Learning Management System',
        },
        {
            id: 'payroll',
            name: 'Payroll',
        },
        {
            id: 'performance',
            name: 'Performance',
        },
        {
            id: 'recruitment',
            name: 'Recruitment',
        },
        {
            id: 'reimbursement',
            name: 'Reimbursement',
        },
        {
            id: 'time',
            name: 'Time',
        },
    ];

    constructor(private datePipe: DatePipe) {}

    checkAction(action) {
        let resultAction = {
            class: null,
            icon: null,
            title: null,
        };

        switch (action) {
            case 'CREATE':
                resultAction = {
                    class: 'action--add',
                    icon: 'fa-solid fa-plus',
                    title: 'Add',
                };
                break;
            case 'UPDATE':
                resultAction = {
                    class: 'action--update',
                    icon: 'fa-solid fa-pen',
                    title: 'Edit',
                };
                break;

            case 'DELETE':
                resultAction = {
                    class: 'action--delete',
                    icon: 'fa-solid fa-trash-can',
                    title: 'Delete',
                };
                break;

            default:
                resultAction = {
                    class: 'action--unknown',
                    icon: 'fa-solid fa-question',
                    title: 'Unknown',
                };
                break;
        }

        return resultAction;
    }

    setFieldsPerCol(inputArray) {
        const result = { left: [], right: [] };

        if (inputArray.length <= 6) {
            result.left = inputArray;
            return result;
        }

        const leftLength = Math.ceil(inputArray.length / 2);
        const rightLength = inputArray.length - leftLength;

        result.left = inputArray.slice(0, leftLength);
        result.right = inputArray.slice(rightLength);

        return result;
    }

    removeKeyFromEntity(data: any[]) {
        return data.map((item) => {
            if (item.after && item.after.entity) {
                this.keysToRemove.forEach((key) => {
                    delete item.after.entity[key];
                });

                const remainItemKeyAfter = Object.keys(
                    item.after.entity
                ).length;
                const sortedKeys = Object.keys(item.after.entity).sort();

                if (remainItemKeyAfter > 6) {
                    item.after.isSplitCol = true;
                    item.after.fieldPerCol = this.setFieldsPerCol(sortedKeys);
                } else {
                    item.after.isSplitCol = false;
                    item.after.lengthPerCol = {};
                    item.after.fieldPerCol = {
                        left: sortedKeys,
                    };
                }
            }

            if (
                item.before &&
                item.before.entity &&
                item.after.action !== 'DELETE'
            ) {
                this.keysToRemove.forEach((key) => {
                    delete item.before.entity[key];
                });

                const remainItemKeyBefore = Object.keys(
                    item.before.entity
                ).length;
                const sortedKeys = Object.keys(item.before.entity).sort();

                if (remainItemKeyBefore > 6) {
                    item.before.isSplitCol = true;
                    item.before.fieldPerCol = this.setFieldsPerCol(sortedKeys);
                } else {
                    item.before.isSplitCol = false;
                    item.before.lengthPerCol = {};
                    item.before.fieldPerCol = {
                        left: sortedKeys,
                    };
                }
            }

            return item;
        });
    }

    groupDataByIdDate(data) {
        const groupedData = [];

        data.forEach((entry) => {
            const dateKey = entry.id.date;
            let existingGroup = groupedData.find(
                (group) => group.dateKey === dateKey
            );

            if (!existingGroup) {
                existingGroup = { dateKey, entries: [] };
                groupedData.push(existingGroup);
            }

            existingGroup.entries.push(entry);
        });

        return groupedData;
    }

    formatText(moduleName, action?) {
        let result: string;

        const formattedName = moduleName.replace(/([a-z])([A-Z])/g, '$1 $2');
        const resultFormat =
            formattedName.charAt(0).toUpperCase() + formattedName.slice(1);

        if (action) {
            switch (action) {
                case 'CREATE':
                    result = `Has Added data on the ${resultFormat} Menu`;
                    break;
                case 'UPDATE':
                    result = `Has Changed ${resultFormat} Menu Data`;
                    break;
                case 'DELETE':
                    result = `Has Deleted data on the ${resultFormat} Menu`;
                    break;
                default:
                    result = `Unrecognized action: ${action}`;
                    break;
            }
            return result;
        } else {
            return resultFormat;
        }
    }

    isValidDate(dateString) {
        const regexDate = /^\d{4}-\d{2}-\d{2}$/;
        return regexDate.test(dateString) && !isNaN(Date.parse(dateString));
    }

    formatKeysToSentence(key) {
        return key
            .replace(/([a-z])([A-Z])/g, '$1 $2')
            .split('_')
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }

    compareObjects(before, after): any[] {
        const keysBefore = Object.keys(before.entity);
        const keysAfter = Object.keys(after.entity);

        const differentKeys = [];

        keysBefore.forEach((key) => {
            if (after.entity[key] !== before.entity[key]) {
                differentKeys.push(key);
            }
        });

        keysAfter.forEach((key) => {
            if (
                after.entity[key] !== before.entity[key] &&
                !differentKeys.includes(key)
            ) {
                differentKeys.push(key);
            }
        });

        return differentKeys;
    }

    formatTime(time) {
        const timeObject = new Date(time);
        const hours = timeObject.getHours();
        const minutes = timeObject.getMinutes();
        const hours12 = hours % 12 === 0 ? 12 : hours % 12;

        const period = hours < 12 ? 'AM' : 'PM';

        const formattedTime = `${hours12.toString().padStart(2, '0')}.${minutes
            .toString()
            .padStart(2, '0')} ${period}`;

        return formattedTime;
    }

    dateToEpoch(start, end) {
        return {
            start: Math.floor(start.getTime() / 1000) * 1000,
            end: Math.floor(end.getTime() / 1000) * 1000,
        };
    }

    epochToDate(start, end) {
        return {
            start: new Date(start),
            end: new Date(end),
        };
    }

    convertArrayDateToDateRange(dateRangeArray: any[]): string {
        if (dateRangeArray[1] !== null) {
            const startDate = this.datePipe.transform(
                dateRangeArray[0],
                'd MMM yyyy'
            );
            const endDate = this.datePipe.transform(
                dateRangeArray[1],
                'd MMM yyyy'
            );
            return `${startDate} - ${endDate}`;
        } else if (dateRangeArray[1] === null) {
            const singleDate = this.datePipe.transform(
                dateRangeArray[0],
                'd MMM yyyy'
            );
            return singleDate;
        }
        return '';
    }

    isDateRangeValid(dateRange: any[]): boolean {
        const [startDate, endDate] = dateRange;

        const daysDifference = Math.floor(
            (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
        );

        return daysDifference <= 30;
    }
}
