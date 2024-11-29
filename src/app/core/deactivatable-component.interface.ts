import { UrlTree } from "@angular/router";
import { Observable } from "rxjs";

type CanDeactivateFn = (...args: any[]) => Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree;

export interface DeactivatableComponent {
    canDeactivate: () => boolean | Observable<boolean>
}
