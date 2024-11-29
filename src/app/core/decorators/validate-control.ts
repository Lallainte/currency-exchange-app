export function ValidateControl() {
    return function (
        target: any,
        propertyKey: string,
        descriptor: PropertyDescriptor
    ): PropertyDescriptor {
        const originalMethod = descriptor.value;

        descriptor.value = function (
            formControlName: string,
            customTouched?: boolean | undefined
        ): any {
            if (!formControlName) {
                return false;
            }

            if (!this.formGroup?.get(formControlName)) {
                return false;
            }

            return this._helperService.isInvalidControl(
                this.formGroup.get(formControlName),
                customTouched
            );
        };

        return descriptor;
    };
}
