import { StorageConstants } from "../../environment/Storage";
import { DeleteStorage } from "../../services/Storage/StorageServices";

export interface IRouterData {
    title: string;
    path: string;
    icon: string;
    funtion?: any;
    offline: boolean;
}

export const RouterData: IRouterData[] = [
    { title: 'Home', path: '/', icon: 'home', offline: false },
    { title: 'Serviços', path: '/service', icon: 'cog', offline: false },
    { title: 'Ordens de Pedido', path: '/todo', icon: 'list', offline: false },
    { title: 'Conta', path: '/editUser', icon: 'user', offline: false },
    {
        title: 'Sair', path: '/login', icon: 'sign-out', offline: true,
        funtion: () => {
            console.log('Logout user');
            DeleteStorage(StorageConstants.user)
        }
    },
]