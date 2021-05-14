
export interface IRouterData {
    title: string;
    path: string;
    icon: string;
}

export const RouterData: IRouterData[] = [
    { title: 'Home', path: '/', icon: 'home', },
    { title: 'Serviços', path: '/service', icon: 'cog', },
    { title: 'Ordens de Pedido', path: '/todo', icon: 'list', },
    { title: 'Conta', path: '/', icon: 'user', },
    { title: 'Sair', path: '/', icon: 'sign-out', },
]