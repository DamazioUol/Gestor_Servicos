import Service from "../Service.model";
import { TodoStatusEnum } from "./TodoStatusEnum";

export default class Todo {
    constructor(
        public id: string,
        public services: Service[],
        public valorTotal: number,
        public placa: string,
        public modelo: string,
        public date: Date,
        public status: TodoStatusEnum,
        public modified?: Date,
        public valorPaid?: number,
    ) {

    }

}