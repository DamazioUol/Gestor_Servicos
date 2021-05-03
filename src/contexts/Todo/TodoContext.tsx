import { createContext, useEffect, useState } from 'react';
import { StorageConstants } from '../../environment/Storage';
import IPaginationData from '../../models/Pagination/IPaginationData.interface';
import Service from '../../models/Service.model';
import Todo from '../../models/Todo.model';
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
    toogle: () => { },
    getInfo: () => { return null },
});

const TodoProvider = (props: any) => {
    const keyStorage = StorageConstants.todos;
    const [todos, setTodos] = useState<Todo[]>(GetStorage(keyStorage));

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
        const data = newTodos.slice(skip).slice(0, filter.pageSize);

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

    const getInfo = (id: string) => {
        return todos?.find(x => x.id === id) || null;
    };

    const addTodo = (services: Service[], valorTotal: number, placa: string, modelo: string) => {
        let todo: Todo = { id: generateGuid(), services: services, valorTotal: valorTotal, placa: placa.toLocaleUpperCase(), modelo: modelo, done: false, date: new Date(Date.now()) };
        setTodos([...todos, todo]);
    };

    const removeTodo = (todo: Todo) => {
        let newTodos = todos.filter(x => x.id !== todo.id);
        setTodos([...newTodos]);
    }

    const editTodo = (todo: Todo) => {
        let update: boolean = false;
        todos.forEach(task => {
            if (task.id === todo.id) {
                task.modified = new Date(Date.now());
                task.modelo = todo.modelo;
                task.placa = todo.placa.toLocaleUpperCase();
                task.services = todo.services;
                task.valorTotal = todo.valorTotal;
                update = true;
                return;
            }
        })

        if (update) {
            setTodos([...todos]);
        }
    }

    const toogle = (todo: Todo) => {
        let indexTodo = todos.findIndex(x => x.id === todo.id);
        if (indexTodo !== -1) {
            todos[indexTodo].done = !todos[indexTodo].done;
            todos[indexTodo].modified = new Date(Date.now());
            setTodos([...todos]);
        }
    };

    const state = {
        getList, editTodo, addTodo, removeTodo, toogle, getInfo,
    }

    return (
        <TodoContext.Provider value={state}>
            { props.children}
        </TodoContext.Provider >
    );
}

export default TodoProvider;
