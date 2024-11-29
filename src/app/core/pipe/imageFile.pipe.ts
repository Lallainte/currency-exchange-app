import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ApiService } from '@core/service/api.service';
import { ApiServiceEss } from '@core/service/api.service-ess';
import { lastValueFrom } from 'rxjs';

@Pipe({
    name: 'imageFile',
})
export class ImageFile implements PipeTransform {
    web = localStorage.getItem('web');
    srv;
    constructor(
        srv1: ApiService,
        srv2: ApiServiceEss,
        private sanitizer: DomSanitizer
    ) {
        if (this.web == 'admin') {
            this.srv = srv1;
        } else {
            this.srv = srv2;
        }
    }

    transform(id, uri: string) {
        return lastValueFrom(this.srv.getFileByte(uri + id)).then((res) => {
            if (res) {
                // @ts-ignore
                const objectURL = URL.createObjectURL(res);
                const img = this.sanitizer.bypassSecurityTrustUrl(objectURL);
                return img;
            } else {
                return 'assets/no-profile-picture.svg';
            }
        });
    }
}
