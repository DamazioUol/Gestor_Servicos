import { createContext, useEffect, useState } from 'react';
import { StorageConstants } from '../../environment/Storage';
import IPaginationData from '../../models/Pagination/IPaginationData.interface';
import Service from '../../models/Service.model';
import Todo from '../../models/Todo/Todo.model';
import { TodoStatusEnum } from '../../models/Todo/TodoStatusEnum';
import { GetStorage, SaveStorage } from '../../services/Storage/StorageServices';
import { generateGuid } from '../../utils/Utils';
import { ITodoContextType } from './ITodoContextType';

export const TodoContext = createContext<ITodoContextType>({
    getList: () => {
        let a: IPaginationData = { page: 0, pageSize: 0, totalCount: 0 };
        return a;
    },
    addTodo: () => { return true },
    editTodo: () => { return true },
    removeTodo: () => { return true },
    getItem: () => { return null },
});

const TodoProvider = (props: any) => {

    const keyStorage = StorageConstants.todos;
    const [todos, setTodos] = useState<Todo[]>(GetStorage(keyStorage) || []);

    useEffect(() => { // observar as mudanças realizadas no objetivo e automaticamente aciona o save.
        SaveStorage(keyStorage, todos);
    }, [todos]);

    const getList = (filter: IPaginationData) => {
        let newTodos: Todo[] = todos;

        if (filter.search) {
            let search = filter.search.toLocaleLowerCase();
            newTodos = newTodos.filter(item =>
                item.modelo.toLocaleLowerCase().includes(search)
                || item.placa.toLocaleLowerCase().includes(search)
                || item.services.find(service => service.service.toLocaleLowerCase().includes(search))
            )
        }

        if (filter.status != null && filter.status != undefined) {
            newTodos = newTodos.filter(item => item.status === filter.status)
        }

        const totalCount = newTodos.length;

        if (filter.order === 'desc') {
            newTodos = newTodos.sort((taskA, taskB) => {
                return new Date(taskB.date).getTime() - new Date(taskA.date).getTime();
            });
        } else {
            newTodos = newTodos.sort((taskA, taskB) => {
                return new Date(taskA.date).getTime() - new Date(taskB.date).getTime();
            });
        }

        const skip = ((filter.page <= 0 ? 0 : filter.page - 1) * filter.pageSize);
        const data = filter.pageSize == -1 ? newTodos : newTodos.slice(skip).slice(0, filter.pageSize);

        const retorno: IPaginationData = {
            data: data,
            page: filter.page,
            pageSize: filter.pageSize,
            totalCount: totalCount,
            order: filter.order,
            total: newTodos.length,
        }

        return retorno;
    };

    const getItem = (id: string) => {
        return todos?.find(x => x.id === id) || null;
    };

    const addTodo = (services: Service[], valorTotal: number, placa: string, modelo: string, date: Date) => {
        let todo: Todo = {
            id: generateGuid(),
            services: services,
            valorTotal: valorTotal,
            placa: placa.toLocaleUpperCase(),
            modelo: modelo,
            status: TodoStatusEnum.pendente,
            date: date
        };
        setTodos([...todos, todo]);
    };

    const removeTodo = (todo: Todo) => {
        let newTodos = todos.filter(x => x.id !== todo.id);
        setTodos([...newTodos]);
    }

    const editTodo = (todo: Todo, status?: TodoStatusEnum) => {
        let update: boolean = false;
        todos.forEach(task => {
            if (task.id === todo.id) {
                task.modified = new Date(Date.now());
                task.modelo = todo.modelo;
                task.placa = todo.placa.toLocaleUpperCase();
                task.services = todo.services;
                task.valorTotal = todo.valorTotal;
                task.status = status ? status : todo.status;
                update = true;
                return;
            }
        })

        if (update) {
            setTodos([...todos]);
        }
    }

    const state = {
        getList, editTodo, addTodo, removeTodo, getItem,
    }

    return (
        <TodoContext.Provider value={state}>
            { props.children}
        </TodoContext.Provider >
    );
}

export default TodoProvider;
