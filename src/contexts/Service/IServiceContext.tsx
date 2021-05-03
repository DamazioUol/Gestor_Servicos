import IPaginationData from "../../models/Pagination/IPaginationData.interface";
import Service from "../../models/Service.model";

export interface IServiceContextType {
    getList(filter: IPaginationData): IPaginationData;
    addService(description: string, value: string): void;
    editService(description: string, value: string, id?: string): void;
    removeService(service: Service): void;
    getInfo(id: string): Service | null;
}