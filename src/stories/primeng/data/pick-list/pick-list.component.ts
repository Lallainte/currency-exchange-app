import { Component, ChangeDetectorRef } from '@angular/core';
import { ProductService } from './service/productservice';

export interface Product {
    id?: string;
    code?: string;
    name?: string;
    description?: string;
    price?: number;
    quantity?: number;
    inventoryStatus?: string;
    category?: string;
    image?: string;
    rating?: number;
}

@Component({
    selector: 'c-picklist',
    template: `<p-pickList
        [source]="sourceProducts"
        [target]="targetProducts"
        sourceHeader="Available"
        targetHeader="Selected"
        [dragdrop]="true"
        [responsive]="true"
        [sourceStyle]="{ height: '30rem' }"
        [targetStyle]="{ height: '30rem' }"
        breakpoint="1400px"
    >
        <ng-template let-product pTemplate="item">
            <div class="flex flex-wrap p-2 align-items-center gap-3">
                <img
                    class="w-4rem shadow-2 flex-shrink-0 border-round"
                    src="https://primefaces.org/cdn/primeng/images/demo/product/{{
                        product.image
                    }}"
                    alt="{item.name}"
                />
                <div class="flex-1 flex flex-column gap-2">
                    <span class="font-bold">{{ product.name }}</span>
                    <div class="flex align-items-center gap-2">
                        <i class="pi pi-tag text-sm"></i>
                        <span>{{ product.category }}</span>
                    </div>
                </div>
                <span class="font-bold text-900">{{
                    '$' + product.price
                }}</span>
            </div>
        </ng-template>
    </p-pickList>`,
    styleUrls: [],
})
export default class PickListComponent {
    sourceProducts!: Product[];
    targetProducts!: Product[];

    constructor(
        private carService: ProductService,
        private cdr: ChangeDetectorRef
    ) {}

    ngOnInit() {
        this.carService.getProductsSmall().then((products) => {
            this.sourceProducts = products;
            this.cdr.markForCheck();
        });
        this.targetProducts = [];
    }
}
