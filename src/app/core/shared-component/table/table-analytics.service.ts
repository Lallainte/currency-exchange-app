// import { Injectable } from '@angular/core';
// import { ApiServiceEss } from '@core/service/api.service-ess';
// import { HelperService } from 'src/app/core/service/helper-service';
// import { isNil } from 'lodash-es';
// import { AnalyticsApiService } from '@analytics/service/analytics-api.service';

// @Injectable({
//     providedIn: 'root',
// })
// export class TableServiceAnalytics {
//     constructor(private api: AnalyticsApiService, private help: HelperService) {}

//     getList(uri, pi, body?, sort?) {
//         let param = this.help.getParam(pi, body);

//         if (!isNil(sort)) {
//             param = param.set('sortBy', sort);
//         }

//         return this.api.get(uri, param);
//     }

//     formatTime(time) {
//         if (time && typeof time === 'string') {
//             const timeParts = time.split(':');
//             const hours = parseInt(timeParts[0], 10);
//             const minutes = parseInt(timeParts[1], 10);

//             let formattedTime = '';

//             // Format jam
//             if (hours > 0) {
//                 formattedTime += hours.toString().padStart(2, '0') + ' hr ';
//             }

//             // Format menit
//             if (minutes > 0) {
//                 formattedTime += minutes.toString().padStart(2, '0') + ' mins ';
//             }

//             // Jika waktu kosong, kembalikan '0 mins'
//             if (formattedTime.trim() === '') {
//                 formattedTime = '0 mins';
//             }

//             return formattedTime.trim();
//         } else if (typeof time === 'number') {
//             const hours = Math.floor(time / 60);
//             const minutes = time % 60;

//             let formattedTime = '';

//             // Format jam
//             if (hours > 0) {
//                 formattedTime += hours.toString().padStart(2, '0') + ' hr ';
//             } else {
//                 formattedTime += '00 hr';
//             }

//             // Format menit
//             if (minutes > 0) {
//                 formattedTime += minutes.toString().padStart(2, '0') + ' mins ';
//             } else {
//                 formattedTime += '00 mins';
//             }

//             // Jika waktu kosong, kembalikan '0 mins'
//             if (formattedTime.trim() === '') {
//                 formattedTime = '00 mins';
//             }

//             return formattedTime.trim();
//         } else {
//             return '00 mins';
//         }
//     }

//     formatUTCDateForTimezone(inputDateString: string): string {
//         const inputDate = new Date(inputDateString);

//         const day = inputDate.getDate();
//         const month = inputDate.toLocaleString('default', { month: 'short' });
//         const year = inputDate.getFullYear();
//         const options: Intl.DateTimeFormatOptions = {
//             timeZone: 'Asia/Jakarta',
//             hour: 'numeric',
//             minute: 'numeric',
//             hour12: true,
//         };
//         const formattedDate = new Intl.DateTimeFormat('en-US', options).format(
//             inputDate
//         );

//         // eg "04 Jan 2024 at 08:00 AM"
//         return `${day} ${month} ${year} at ${formattedDate}`;
//     }
// }
