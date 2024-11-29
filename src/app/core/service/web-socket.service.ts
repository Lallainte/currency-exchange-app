import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { ApiServiceEss } from './api.service-ess';
import { Observable, Subject } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { over } from 'stompjs';
import SockJS from 'sockjs-client';

@Injectable({
    providedIn: 'root',
})
export class WebSocketService {
    private stompClient: any;
    private stompHeaders: any;
    private connectionStatus$: Subject<boolean> = new Subject<boolean>();

    constructor(
        private readonly _authService: AuthenticationService,
        private readonly _apiAdmin: ApiService,
        private readonly _apiEss: ApiServiceEss
    ) {}

    connect(web: string): Observable<boolean> {
        let serverUrl: string | undefined;

        if (web == 'admin') {
            serverUrl = this._apiAdmin.getSocket();
        } else {
            serverUrl = this._apiEss.getSocket();
        }

        this.stompHeaders = {
            Authorization: 'Bearer ' + this._authService.getSession().accessToken,
            transports: ['websocket'],
        };

        // const socket = new SockJS('https://89d82caf8a7fbf.lhr.life/api/v1/mobile/socket');
        const socket = new SockJS(serverUrl);

        this.stompClient = over(socket);
        this.stompClient.debug = null;

        this.stompClient.connect(
            this.stompHeaders,
            () => {
                this.connectionStatus$.next(true);
            },
            () => {
                this.connectionStatus$.next(false);
                this.disconnect();
            }
        );

        return this.connectionStatus$.asObservable();
    }

    subscribe(topic: string): Observable<any> {
        return new Observable((observer) => {
            if (!this.stompClient) {
                observer.error('WebSocket connection is not established.');
            }

            let subscription = this.stompClient.subscriptions[topic];
            if (!subscription) {
                subscription = this.stompClient.subscribe(
                    topic,
                    (message: any) => {
                        observer.next(message);
                    }
                );
                this.stompClient.subscriptions[topic] = subscription;
            }

            this.connectionStatus$.subscribe((connected) => {
                if (!connected && subscription) {
                    subscription.unsubscribe();
                    delete this.stompClient.subscriptions[topic];
                }
            });

            return () => {
                if (subscription) {
                    subscription.unsubscribe();
                    delete this.stompClient.subscriptions[topic];
                }
            };
        });
    }

    send(destination: string, body: any): void {
        this.stompClient.send(
            destination,
            this.stompHeaders,
            JSON.stringify(body)
        );
    }

    disconnect(): void {
        if (this.stompClient && this.stompClient.connected) {
            Object.keys(this.stompClient.subscriptions).forEach((topic) => {
                delete this.stompClient.subscriptions[topic];
            });

            this.stompClient.disconnect(() => {
                this.connectionStatus$.next(false);
                this.stompClient = null;
            });
        }
    }
}
