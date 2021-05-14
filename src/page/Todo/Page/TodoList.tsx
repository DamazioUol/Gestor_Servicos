import { yupResolver } from '@hookform/resolvers/yup';
import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import Pagination from '../../../components/Pagination/Pagination';
import { ITodoContextType } from '../../../contexts/Todo/ITodoContextType';
import { TodoContext } from '../../../contexts/Todo/TodoContext';
import IPaginationData from '../../../models/Pagination/IPaginationData.interface';
import { TodoStatusEnum } from '../../../models/Todo/TodoStatusEnum';
import TodoListItem from './TodoListItem';

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

const cssButtonSearch: React.CSSProperties = {
    marginBottom: 'unset',
}

const cssFormSearch: React.CSSProperties = {
    width: '100%',
}

interface ISearch {
    search: string;
    status: string;
}

const TodoList = () => {
    const todoContext = useContext<ITodoContextType>(TodoContext);
    const fieldsTable = ['Modelo', 'Placa', 'Status', 'Valor Total', 'Registro', 'Modificação', '', ''];
    const pageSize: number = 5;
    const [pageData, setPageData] = useState<IPaginationData>(todoContext.getList({ totalCount: 0, page: 0, pageSize: pageSize, order: 'desc' }));
    const [search, setSearch] = useState<ISearch>();

    const getList = (pageNext: number) => {
        let filter: IPaginationData = {
            page: pageNext,
            pageSize: pageSize,
            totalCount: 0,
            order: 'desc',
            search: search?.search,
            status: getStatus()
        };
        let array = todoContext.getList(filter);
        setPageData(array);
    }

    useEffect(() => {
        getList(0);
    }, [search])

    const getStatus = () => {
        switch (search?.status) {
            case "0":
                return TodoStatusEnum.pendente;
            case "1":
                return TodoStatusEnum.pre_finalizado;
            case "2":
                return TodoStatusEnum.finalizado;
            default:
                return undefined;
        }
    }

    const schema = yup.object().shape({
        search: yup.string(),
        status: yup.string(),
    })

    const { register, handleSubmit } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = (data: ISearch) => {
        setSearch({ search: data.search, status: data.status });
    };

    return (
        <>
            <div className="uk-margin-small-bottom">
                <div className="uk-align-left" style={cssDivormSearch}>
                    <div className="uk-search uk-search-default" style={cssFormSearch}>
                        <input {...register("search")} id="search" name="search" className="uk-search-input" type="text" placeholder="Modelo ou placa" />
                    </div>
                </div>
                <div className="uk-align-left" style={cssDivormSearch}>
                    <select  {...register("status")} className="uk-select" name="status" id="status">
                        <option value={undefined}>Selecione</option>
                        <option value="0">Pendente</option>
                        <option value="1">Pré finalizado</option>
                        <option value="2">Finalizado</option>
                    </select>
                </div>
                <div className="uk-align-left" style={cssButtonSearch}>
                    <a uk-tooltip="Pesquisar" onClick={handleSubmit<ISearch>(onSubmit)} className=" uk-icon-button uk-button-secondary" uk-search-icon="true"></a>
                </div>
                <div className="uk-align-right" style={cssMarginBottomUnset} uk-tooltip="Novo pedido" >
                    <a className="uk-icon-button uk-button-secondary" style={cssPlus} href="/addTodo">
                        <span uk-icon="icon: plus; ratio: 1.5"></span>
                    </a>
                </div>
            </div>

            <table className="uk-table uk-table-striped uk-table-middle " >
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
                        pageData.data?.map((todo, index) => {
                            return (
                                <TodoListItem todo={todo} key={index}></TodoListItem>
                            );
                        })
                    }
                </tbody>
            </table>
            <Pagination pageSize={pageData.pageSize} page={pageData.page} totalCount={pageData.totalCount} paginationFunction={getList}  ></Pagination>
        </>
    );
};

export default TodoList;