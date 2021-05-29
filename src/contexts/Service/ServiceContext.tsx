import { createContext, useEffect, useState } from 'react';
import { StorageConstants } from '../../environment/Storage';
import IPaginationData from '../../models/Pagination/IPaginationData.interface';
import Service from '../../models/Service.model';
import { GetStorage, SaveStorage } from '../../services/Storage/StorageServices';
import { generateGuid } from '../../utils/Utils';
import { IServiceContextType } from './IServiceContext';


export const ServiceContext = createContext<IServiceContextType>({
    getList: () => {
        let a: IPaginationData = { page: 0, pageSize: 0, totalCount: 0 };
        return a;
    },
    addService: () => { return true },
    editService: () => { return true },
    removeService: () => { return true },
    getInfo: () => { return null },
});

const ServiceProvider = (props: any) => {
    const keyStorage = StorageConstants.services;
    const [services, setServices] = useState<Service[]>(GetStorage(keyStorage) || []);

    useEffect(() => {
        SaveStorage(keyStorage, services);
    }, [services]);

    const getList = (filter: IPaginationData) => {
        let newServices = GetStorage(keyStorage) as Service[];

        if (filter.search) {
            const search = filter.search?.toLocaleLowerCase();
            newServices = newServices.filter(service => service.service.toLocaleLowerCase().includes(search));
        }

        const totalCount = newServices.length;

        if (filter.order === 'desc') {
            newServices = newServices.sort((itemA, itemB) => {
                return ('' + itemA.service).localeCompare(itemB.service);
            })
        } else {
            newServices = newServices.sort((itemA, itemB) => {
                return ('' + itemB.service).localeCompare(itemA.service);
            })
        }

        const skip = ((filter.page <= 0 ? 0 : filter.page - 1) * filter.pageSize);
        const data = newServices.slice(skip).slice(0, filter.pageSize);

        const retorno: IPaginationData = {
            data: data,
            page: filter.page,
            pageSize: filter.pageSize,
            totalCount: totalCount,
            order: filter.order,
            total: newServices.length,
        }
        return retorno;
    }

    const addService = (description: string, value: string) => {
        const newValue = Number(value.replace('.', '').replace(',', '.'));
        let service: Service = { id: generateGuid(), service: description, value: newValue, date: new Date(Date.now()) };
        setServices([...services, service]);
    }

    const removeService = (sevice: Service) => {
        let newServices = services.filter(x => x.id !== sevice.id);
        setServices([...newServices]);
    }

    const editService = (service: string, value: string, id?: string) => {
        let update: boolean = false;
        const newValue = Number(value.replace('.', '').replace(',', '.'));
        services.forEach(item => {
            if (item.id === id) {
                item.modified = new Date(Date.now());
                item.value = newValue;
                item.service = service;
                update = true;
                return;
            }
        })

        if (update) {
            setServices([...services]);
        }
    }

    const getInfo = (id: string) => {
        return services?.find(x => x.id === id) || null;
    }


    return (
        <ServiceContext.Provider value={{ getList, addService, removeService, getInfo, editService }}>
            { props.children}
        </ServiceContext.Provider >
    );
}

export default ServiceProvider;
