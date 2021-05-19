import { StorageConstants } from "../../environment/Storage";
import { DeleteStorage } from "../../services/Storage/StorageServices";

export interface IRouterData {
    title: string;
    path: string;
    icon: string;
    funtion?: any
}

export const RouterData: IRouterData[] = [
    { title: 'Home', path: '/', icon: 'home', },
    { title: 'Serviços', path: '/service', icon: 'cog', },
    { title: 'Ordens de Pedido', path: '/todo', icon: 'list', },
    { title: 'Conta', path: '/', icon: 'user', },
    {
        title: 'Sair', path: '/login', icon: 'sign-out', funtion: () => {
            console.log('Logout user');
            DeleteStorage(StorageConstants.user)
        }
    },
]