import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/core/service/api.service';
import { AuthenticationService } from 'src/app/core/service/authentication.service';
import { environment } from 'src/environments/environment';
import { firstValueFrom, lastValueFrom } from 'rxjs';
@Component({
    selector: 'app-redirect',
    templateUrl: './redirect.component.html',
    styleUrls: ['./redirect.component.scss'],
})
export class RedirectComponent implements OnInit {
    token;
    constructor(
        private srv: ApiService,
        private aRoute: ActivatedRoute,
        private route: Router,
        private auth: AuthenticationService
    ) {}

    ngOnInit(): void {
        this.aRoute.queryParams.subscribe((queryParams) => {
            this.token = queryParams['token'];
            if (this.token) {
                this.onLoginSSO(this.token);
            } else {
                lastValueFrom(this.srv.getSSOToken(true)).then((res) => {
                    lastValueFrom(
                        this.srv.postLoginSSO(res.accessToken, true)
                    ).then((resp) => {
                        this.onLoginSSO(resp.code);
                    });
                });
            }
        });
    }

    onLoginSSO(code) {
        this.srv.get('open/auth/detail/' + code, null, true).subscribe({
            next: (resp) => {
                if (resp) {
                    let data = JSON.stringify(resp);
                    this.auth.createSession(data);
                    this.route.navigate(['/']);
                } else {
                    this.isNotValid();
                }
            },
            error: (err) => {
                this.isNotValid();
            },
        });
    }

    isNotValid() {
        if (environment.isSSO) {
            window.location.href = environment.linovWordpress;
        } else {
            this.route.navigate(['/login']);
        }
    }
}
