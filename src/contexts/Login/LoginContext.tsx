import { createContext, useEffect, useState } from "react";
import { StorageConstants } from "../../environment/Storage";
import Login from "../../models/Login";
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
    const keyStorageUser = StorageConstants.user;
    const [users, setUsers] = useState<User[]>(GetStorage(keyStorageUsers));
    const [userCurrent, setUserCurrent] = useState<User>(GetStorage(keyStorageUser));

    useEffect(() => {
        SaveStorage(keyStorageUser, userCurrent);
        SaveStorage(keyStorageUsers, users);
    }, [users, userCurrent]);

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
        SaveStorage(keyStorageUser, user);
        setUsers([...users, user]);
        return true;
    }

    const login = (login: Login) => {
        const user = users.find(item => item.email === login.email && item.password === btoa(login.password));
        if (user != null) SaveStorage(keyStorageUser, user);
        return user != null;
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
            setUserCurrent(newUser);
            setUsers([...users]);
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
        return userCurrent;
    }

    return (
        <LoginContext.Provider value={{ registerUser, login, editUser, getUserCurrent, deleteUser }}>
            { props.children}
        </LoginContext.Provider >
    );
}

export default LoginProvider;