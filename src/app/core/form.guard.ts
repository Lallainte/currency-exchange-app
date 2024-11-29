import { CanDeactivateFn } from '@angular/router'
import { Observable } from 'rxjs'
import { DeactivatableComponent } from './deactivatable-component.interface'

/** Our Route Guard as a Function */
export const canDeactivateFormComponent: CanDeactivateFn<DeactivatableComponent> = (component: DeactivatableComponent) => {
    return component.canDeactivate() ?
      true :
      // NOTE: this warning message will only be shown when navigating elsewhere within your angular app;
      // when navigating away from your angular app, the browser will show a generic warning message
      // see http://stackoverflow.com/a/42207299/7307355
      confirm('Changes you made may not be saved.');
}
