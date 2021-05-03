import IPaginationData from "../../models/Pagination/IPaginationData.interface";
import Service from "../../models/Service.model";
import Todo from "../../models/Todo.model";


export interface ITodoContextType {
    getList(filter: IPaginationData): IPaginationData;
    addTodo(services: Service[], valorTotal: number, placa: string, modelo: string): void;
    editTodo(todo: Todo): void;
    removeTodo(todo: Todo): void;
    toogle(todo: Todo): void;
    getInfo(id: string): Todo | null;
}