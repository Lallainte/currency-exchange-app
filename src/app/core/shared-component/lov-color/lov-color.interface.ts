export interface Color {
    id: string;
    name: string;
    hexCode: string;
    version: number;
    isActive: boolean;
    companyId: string;
    companyName: string;
    description: string;
}

export interface Paging {
    page: number;
    sortBy: string[];
    pageSize: number;
    totalPage: number;
    totalItem: number;
}

export interface Response {
    paging?: Paging;
    code: number;
    data: any | any[];
    status: string;
}
