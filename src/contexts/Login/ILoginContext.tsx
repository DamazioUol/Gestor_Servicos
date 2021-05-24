import Login from "../../models/Login";
import User from "../../models/User";

export interface ILoginContextType {
    registerUser(userName: string, email: string, password: string): boolean;
    login(login: Login): boolean;
    editUser(login: User): void;
    deleteUser(login: User): void;
    getUserCurrent(): User;
}