import Login from "../../models/Login";
import User from "../../models/User";

export interface ILoginContextType {
    registerUser(user: User): void;
    login(login: Login): boolean;
    editUser(login: User): void;
    deleteUser(login: User): void;
    getInfo(user: User): Login | null;
}