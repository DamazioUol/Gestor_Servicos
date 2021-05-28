import { createContext, useEffect, useState } from "react";
import { StorageConstants } from "../../environment/Storage";
import Login from "../../models/Login";
import Token from "../../models/Token";
import User from "../../models/User";
import { GetStorage, SaveStorage } from "../../services/Storage/StorageServices";
import { generateGuid } from "../../utils/Utils";
import { ILoginContextType } from "./ILoginContext";

export const LoginContext = createContext<ILoginContextType>({
    registerUser: () => { return true },
    login: () => { return true },
    editUser: () => { return true },
    deleteUser: () => { return true },
    getUserCurrent: () => { return null },
});


const LoginProvider = (props: any) => {

    const keyStorageUsers = StorageConstants.users;
    const keyStorageToken = StorageConstants.token;
    const [users, setUsers] = useState<User[]>(GetStorage(keyStorageUsers) || []);
    const [token, setToken] = useState<Token>(GetStorage(keyStorageToken));

    useEffect(() => {
        SaveStorage(keyStorageToken, token);
        SaveStorage(keyStorageUsers, users);
    }, [users, token]);

    const registerUser = (userName: string, email: string, password: string) => {
        const userRegister = users.find(item => item.email = email);
        if (userRegister) return false;

        const user: User = {
            id: generateGuid(),
            name: userName,
            password: btoa(password),
            email: email,
            date: new Date(Date.now())
        };
        generateToken(user);
        setUsers([...users, user]);
        return true;
    }

    const login = (login: Login) => {
        const user = users.find(item => item.email === login.email && item.password === btoa(login.password));
        if (user != null) {
            generateToken(user);
        }
        return user != null;
    }
    const generateToken = (user: User) => {
        const dateCurrent = new Date(Date.now());
        const dateExpired = new Date(new Date(Date.now()).setDate(dateCurrent.getDate() + 1));
        const token = new Token(
            user,
            dateCurrent,
            dateExpired
        );
        setToken(token);
    }

    const editUser = (user: User) => {
        let newUser = null;
        users.forEach(item => {
            if (item.id == user.id) {
                item.email = user.email;
                item.password = !isBase64(user.password) ? user.password : btoa(user.password);
                item.name = user.name;
                item.modified = new Date(Date.now());
                newUser = item;
            }
        });

        if (newUser) {
            generateToken(user);
            setUsers([...users, user]);
        }
    }

    const isBase64 = (text: string) => {
        var base64Matcher = new RegExp("^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{4})$");
        return base64Matcher.test(text);
    }

    const deleteUser = (user: User) => {
        let newUsers = users.filter(x => x.id !== user.id);
        setUsers([...newUsers]);
        window.location.href = "/login";
    }

    const getUserCurrent = (): User => {
        return token.user;
    }

    return (
        <LoginContext.Provider value={{ registerUser, login, editUser, getUserCurrent, deleteUser }}>
            { props.children}
        </LoginContext.Provider >
    );
}

export default LoginProvider;