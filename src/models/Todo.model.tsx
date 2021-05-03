import Service from "./Service.model";

export default class Todo {
    constructor(
        public id: string,
        public services: Service[],
        public valorTotal: number,
        public placa: string,
        public modelo: string,
        public done: boolean,
        public date: Date,
        public modified?: Date
    ) {

    }

}