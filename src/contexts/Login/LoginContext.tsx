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
    getInfo: () => { return null },
});


const LoginProvider = (props: any) => {

    const keyStorageUsers = StorageConstants.users;
    const keyStorageUser = StorageConstants.user;
    const [users, setUsers] = useState<User[]>(GetStorage(keyStorageUsers));

    useEffect(() => {
        SaveStorage(keyStorageUsers, users);
    }, [users]);

    const registerUser = (newUser: User) => {
        const user: User = {
            id: generateGuid(),
            name: newUser.name,
            password: btoa(newUser.password),
            email: newUser.email,
            date: new Date(Date.now())
        };
        setUsers([...users, user]);
    }

    const login = (login: Login) => {
        const user = users.find(item => item.email = login.email && atob(login.password));
        if (user != null) SaveStorage(keyStorageUser, user);
        return user != null;
    }

    const editUser = (user: User) => {
        let update = false;
        users.forEach(item => {
            if (item.id == user.id) {
                update = true;
                item.email = user.email;
                item.password = isBase64(user.password) ? user.password : btoa(user.password);
                item.email = user.email;
                item.email = user.email;
            }
        });

        if (update) {
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
    }

    const getInfo = (user: User) => {
        const userFind = users.find(item => item.email == user.email);
        return userFind;
    }

    return (
        <LoginContext.Provider value={{ registerUser, login, editUser, getInfo, deleteUser }}>
            { props.children}
        </LoginContext.Provider >
    );
}

export default LoginProvider;