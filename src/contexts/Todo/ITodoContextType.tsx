import IPaginationData from "../../models/Pagination/IPaginationData.interface";
import Service from "../../models/Service.model";
import Todo from "../../models/Todo/Todo.model";
import { TodoStatusEnum } from "../../models/Todo/TodoStatusEnum";


export interface ITodoContextType {
    getList(filter: IPaginationData): IPaginationData;
    addTodo(services: Service[], valorTotal: number, placa: string, modelo: string): void;
    editTodo(todo: Todo, status?: TodoStatusEnum): void;
    removeTodo(todo: Todo): void;
    getItem(id: string): Todo | null;
}