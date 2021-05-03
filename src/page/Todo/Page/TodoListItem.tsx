import React, { useContext } from 'react';
import { ITodoContextType } from '../../../contexts/Todo/ITodoContextType';
import { TodoContext } from '../../../contexts/Todo/TodoContext';
import Todo from '../../../models/Todo.model';
import { formatCurrencyMoneyWithSymbols, formatDateWithHours } from '../../../utils/Utils';

interface TodoListItemProps {
    todo: Todo
}

const TodoListItem = (props: TodoListItemProps) => {
    const { toogle, removeTodo } = useContext<ITodoContextType>(TodoContext);

    return (
        <tr className="uk-animation-slide-bottom-medium">
            <td className="uk-width-auto">
                <label >
                    <input onChange={() => toogle(props.todo)} checked={props.todo.done} className="uk-checkbox" type="checkbox" />
                </label>
            </td>
            <td className="uk-width-1-5">{props.todo.modelo}</td>
            <td className="uk-width-1-6">{props.todo.placa}</td>
            <td className="uk-width-1-3">{formatCurrencyMoneyWithSymbols(props.todo.valorTotal)}</td>
            <td className="uk-width-1-6">{formatDateWithHours(props.todo.date)}</td>
            <td className="uk-width-1-6">{formatDateWithHours(props.todo.modified)}</td>

            <td className="uk-width-auto">
                <button onClick={() => removeTodo(props.todo)} className="uk-icon-button uk-button-danger" uk-icon="trash"></button>
            </td>
            <td className="uk-width-auto">
                <a className="uk-icon-button uk-button-primary" href={`/editTodo/${props.todo.id}`}>
                    <span uk-icon="icon: pencil; ratio: 1.1"></span>
                </a>
            </td>
        </tr>
    );
};

export default TodoListItem;