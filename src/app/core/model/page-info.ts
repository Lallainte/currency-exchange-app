export class PageInfo {
    constructor(public page: number, public limit: number) { }

    get pageInfo(): string {
        return this.page.toString();
    }

    get pageLimit(): string {
        return this.limit.toString();
    }
}
