import {
    Input,
    OnInit,
    Output,
    OnDestroy,
    Directive,
    ElementRef,
    EventEmitter,
} from '@angular/core';
import { debounceTime, filter } from 'rxjs/operators';
import { fromEvent, Subscription } from 'rxjs';

@Directive({
    selector: '[appInfiniteScroll]',
})
export class InfiniteScrollDirective implements OnInit, OnDestroy {
    @Output() nearEnd: EventEmitter<void> = new EventEmitter<void>();
    @Input() threshold = 500;
    @Input() maxDataReached = false;

    private scrollSubscription: Subscription | undefined;

    constructor(private el: ElementRef) {}

    ngOnInit(): void {
        this.scrollSubscription = fromEvent(window, 'scroll')
            .pipe(
                debounceTime(200),
                filter(() => !this.maxDataReached && this.isNearEnd())
            )
            .subscribe(() => {
                this.nearEnd.emit();
            });
    }

    ngOnDestroy(): void {
        if (this.scrollSubscription) {
            this.scrollSubscription.unsubscribe();
        }
    }

    private isNearEnd(): boolean {
        const heightOfWholePage = document.documentElement.scrollHeight;
        const heightOfElement = this.el.nativeElement.scrollHeight;
        const currentScrolledY = window.scrollY;
        const innerHeight = window.innerHeight;

        const spaceOfElementAndPage = heightOfWholePage - heightOfElement;
        const scrollToBottom =
            heightOfElement -
            innerHeight -
            currentScrolledY +
            spaceOfElementAndPage;

        return scrollToBottom < this.threshold;
    }

    updateMaxDataStatus(status: boolean): void {
        this.maxDataReached = status;
    }
}
