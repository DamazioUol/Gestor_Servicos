export default class Service {
    constructor(
        public id: string,
        public service: string,
        public value: number,
        public date: Date,
        public modified?: Date
    ) {

    }
}