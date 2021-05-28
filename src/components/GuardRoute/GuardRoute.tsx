import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { StorageConstants } from '../../environment/Storage';
import Token from '../../models/Token';
import { DeleteStorage, GetStorage } from '../../services/Storage/StorageServices';

interface IGuardRoute {
    path: string;
    component: any;
    auth: boolean;
}
const keyStorageToken = StorageConstants.token;

const authentication = {
    isLoggedIn: false,
    onAuthenticatino() {
        console.log(' onAuthenticatino');
        const token: Token = GetStorage(keyStorageToken);
        const expired = token && token.expired ? new Date(token.expired) <= new Date(Date.now()) : true;
        if (expired) {
            DeleteStorage(StorageConstants.token);
            this.isLoggedIn = false;
        }
        else {
            this.isLoggedIn = true;
        }
    },
    getLoginStatus() {
        this.onAuthenticatino();
        console.log(' getLoginStatus');
        return this.isLoggedIn;
    }
}

const GuardRoute = (config: IGuardRoute) => {

    return (
        <Route path={config.path} render={(props) =>
            !config.auth || authentication.getLoginStatus() ?
                <config.component {...props} /> :
                <Redirect to="/login" />
        } />
    )
}

export default GuardRoute
