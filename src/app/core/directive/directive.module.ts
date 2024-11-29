import { NgModule } from '@angular/core';
import { AutocompleteOffDirective } from './autocomplete-off.directive';
import { OnlyNumberDirective } from './only-number.directive';

@NgModule({
    imports: [],
    declarations: [OnlyNumberDirective,AutocompleteOffDirective],
    providers: [],
    exports: [OnlyNumberDirective,AutocompleteOffDirective],
})
export class DirectiveModule {}
