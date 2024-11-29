import { NgModule } from '@angular/core';
import { CheckDateValidPipe } from './check-date.pipe';
import { CurrPipe } from './curr.pipe';
import { FormatDatePipe } from './date-format.pipe';
import { SpaceToCommaPipe } from './space-to-comma.pipe';
import { FormatTimePipe } from './time-format.pipe';
import { FormatDateTimeZonePipe } from './dateTimeZone-format.pipe';
import { TitleCasePipe } from './title-case.pipe';
import { TruncatePipe } from './truncate.pipe';
import { EmptyTextPipe } from './empty-text.pipe';
import { convertInputArrayPipe } from './convertInputArrayToString.pipe';
import { FormatYearPeriod } from './year-period.pipe';
import { EmployeePhoto } from './employeePhoto.pipe';
import { FormatSecondToTIme } from './format-secondTotime';
import { ImageFile } from './imageFile.pipe';
@NgModule({
    declarations: [
        FormatDatePipe,
        SpaceToCommaPipe,
        FormatTimePipe,
        CheckDateValidPipe,
        FormatDateTimeZonePipe,
        FormatYearPeriod,
        CurrPipe,
        TitleCasePipe,
        TruncatePipe,
        EmptyTextPipe,
        convertInputArrayPipe,
        EmployeePhoto,
        FormatSecondToTIme,
        ImageFile,
    ],
    exports: [
        FormatDatePipe,
        SpaceToCommaPipe,
        FormatTimePipe,
        CheckDateValidPipe,
        FormatDateTimeZonePipe,
        FormatYearPeriod,
        CurrPipe,
        TitleCasePipe,
        TruncatePipe,
        EmptyTextPipe,
        convertInputArrayPipe,
        EmployeePhoto,
        FormatSecondToTIme,
        ImageFile,
    ],
})
export class PipeModule {}
