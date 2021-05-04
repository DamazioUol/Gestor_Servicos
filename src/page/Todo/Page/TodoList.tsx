import { yupResolver } from '@hookform/resolvers/yup';
import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import Pagination from '../../../components/Pagination/Pagination';
import { ITodoContextType } from '../../../contexts/Todo/ITodoContextType';
import { TodoContext } from '../../../contexts/Todo/TodoContext';
import IPaginationData from '../../../models/Pagination/IPaginationData.interface';
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

const cssFormSearch: React.CSSProperties = {
    width: '100%',
}

interface ISearch {
    search: string;
}

const TodoList = () => {
    const todoContext = useContext<ITodoContextType>(TodoContext);
    const fieldsTable = ['Modelo', 'Placa', 'Status', 'Valor Total', 'Registro', 'Modificação', '', ''];
    const pageSize: number = 5;
    const [pageData, setPageData] = useState<IPaginationData>(todoContext.getList({ totalCount: 0, page: 0, pageSize: pageSize, order: 'desc' }));
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
        let array = todoContext.getList(filter);
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
            <div className="uk-margin-small-bottom">
                <div className="uk-align-left" style={cssDivormSearch}>
                    <form className="uk-search uk-search-default" style={cssFormSearch}>
                        <a onClick={handleSubmit<ISearch>(onSubmit)} className="uk-search-icon-flip" uk-search-icon="true"></a>
                        <input {...register("search")} id="search" name="search" className="uk-search-input" type="text" placeholder="Modelo ou placa" />
                    </form>
                </div>
                <div className="uk-align-right" style={cssMarginBottomUnset} >
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