import User from "./User";

export default class Token {
    constructor(
        public user: User,
        public date: Date,
        public expired: Date,
    ) {

    }
}