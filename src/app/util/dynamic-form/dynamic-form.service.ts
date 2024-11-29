import {
    Injectable,
    Injector,
    ComponentFactoryResolver,
    EmbeddedViewRef,
    ApplicationRef,
    ComponentRef,
} from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class DynamicFormService {
    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
        private appRef: ApplicationRef,
        private injector: Injector
    ) {}

    public appendComponentTo(target = 'body', component: any) {
        const componentRef = this.componentFactoryResolver
            .resolveComponentFactory(component)
            .create(this.injector);
        const domElem = (componentRef.hostView as EmbeddedViewRef<any>)
            .rootNodes[0] as HTMLElement;

        this.appRef.attachView(componentRef.hostView);

        document.querySelector(target).appendChild(domElem);

        // setTimeout(() => {
        //     this.appRef.detachView(componentRef.hostView);
        //     componentRef.destroy();
        // }, 3000);
    }
}
