export default interface IPaginationData {
    page: number;
    pageSize: number;
    data?: any[];
    order?: string; // desc or null
    search?: string;
    total?: number; // total item list
    totalCount: number; // total all itens
    status?: any;
}