import { yupResolver } from '@hookform/resolvers/yup'
import React, { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import Pagination from '../../../components/Pagination/Pagination'
import { IServiceContextType } from '../../../contexts/Service/IServiceContext'
import { ServiceContext } from '../../../contexts/Service/ServiceContext'
import IPaginationData from '../../../models/Pagination/IPaginationData.interface'
import ServiceListItem from './ServiceListItem'

const cssPlus: React.CSSProperties = {
    padding: '7px',
}

const cssMarginBottomUnset: React.CSSProperties = {
    marginBottom: 'unset',
}

const cssDivormSearch: React.CSSProperties = {
    marginBottom: 'unset',
    minWidth: '285px'
}

const cssFormSearch: React.CSSProperties = {
    width: '100%',
}

interface ISearch {
    search: string;
}

const ServiceList = () => {
    const serviceContext = useContext<IServiceContextType>(ServiceContext);
    const fieldsTable = ['Serviço', 'Valor', 'Registro', 'Atualização', '', ''];
    const pageSize: number = 5;
    const [pageData, setPageData] = useState<IPaginationData>(serviceContext.getList({ totalCount: 0, page: 0, pageSize: pageSize, order: 'asc' }));
    const [search, setSearch] = useState<string>();

    useEffect(() => {
        getList(0);
    }, [search])

    const getList = (pageNext: number) => {
        let filter: IPaginationData = {
            page: pageNext,
            pageSize: pageSize,
            totalCount: 0,
            order: 'desc',
            search: search
        };
        let array = serviceContext.getList(filter);
        setPageData(array);
    }

    const schema = yup.object().shape({
        search: yup.string(),
    })

    const { register, handleSubmit } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = (data: ISearch) => {
        setSearch(data.search);
    };

    return (
        <>
            <div>
                <div className="uk-align-left" style={cssDivormSearch}>
                    <form className="uk-search uk-search-default" style={cssFormSearch}>
                        <a onClick={handleSubmit<ISearch>(onSubmit)} className="uk-search-icon-flip" uk-search-icon="true"></a>
                        <input {...register("search")} id="search" name="search" className="uk-search-input" type="text" placeholder="Serviço" />
                    </form>
                </div>
                <div className="uk-align-right" style={cssMarginBottomUnset} >
                    <a className="uk-icon-button uk-button-secondary" style={cssPlus} href="/addService">
                        <span uk-icon="icon: plus; ratio: 1.5"></span>
                    </a>
                </div>
            </div>

            <table className="uk-table uk-table-striped uk-table-middle" >
                <thead>
                    <tr>
                        {fieldsTable.map((field, index) => {
                            return (
                                <th key={index}>{field}</th>
                            )
                        })}
                    </tr>
                </thead>
                <tbody>
                    {
                        pageData.data?.map((service, index) => {
                            return (
                                <ServiceListItem service={service} key={index}></ServiceListItem>
                            );
                        })
                    }
                </tbody>
            </table>
            <Pagination pageSize={pageData.pageSize} page={pageData.page} totalCount={pageData.totalCount} paginationFunction={getList}  ></Pagination>
        </>
    );
}

export default ServiceList;
