import React, { useContext } from 'react';
import { ITodoContextType } from '../../../contexts/Todo/ITodoContextType';
import { TodoContext } from '../../../contexts/Todo/TodoContext';
import Todo from '../../../models/Todo/Todo.model';
import { formatCurrencyMoneyWithSymbols, formatDateWithHours } from '../../../utils/Utils';

interface TodoListItemProps {
    todo: Todo
}

const TodoListItem = (props: TodoListItemProps) => {
    const { removeTodo } = useContext<ITodoContextType>(TodoContext);

    const getStatusDescription = () => {
        switch (props.todo.status) {
            case 0:
                return "Pendente"
            case 1:
                return "Pré finalizado"
            case 2:
                return "Finalizado"
        }
    }

    const getIcon = () => {
        switch (props.todo.status) {
            case 0:
                return "check"
            case 1:
                return "cart"
            case 2:
                return "ban"
        }
    }

    const getStyle = (): React.CSSProperties => {
        switch (props.todo.status) {
            case 0:
                return { backgroundColor: 'green', color: 'black', border: '1px solid green', }
            case 1:
                return { backgroundColor: 'yellow', color: 'black', border: '1px solid yellow', }
            default:
                return { backgroundColor: 'white', border: '1px solid', };
        }
    }

    const getUrl = () => {

        switch (props.todo.status) {
            case 0:
                return `/prefinished/${props.todo.id}`
            case 1:
                return `/finished/${props.todo.id}`
            case 3:
                return "#"
        }
    }

    return (
        <tr className="uk-animation-slide-bottom-medium">
            <td className="uk-width-auto">{props.todo.modelo}</td>
            <td className="uk-width-auto">{props.todo.placa}</td>
            <td className="uk-width-auto">{getStatusDescription()}</td>
            <td className="uk-width-auto">{formatCurrencyMoneyWithSymbols(props.todo.valorTotal)}</td>
            <td className="uk-width-auto">{formatDateWithHours(props.todo.date)}</td>
            <td className="uk-width-auto">{formatDateWithHours(props.todo.modified)}</td>


            {/* <td className="uk-width-auto">
                <button onClick={() => removeTodo(props.todo)} className="uk-icon-button uk-button-danger" uk-icon="trash"></button>
            </td> */}
            <td className="uk-width-auto">
                <a className={`uk-icon-button`} href={getUrl()} style={getStyle()}>
                    <span uk-icon={`icon: ${getIcon()}; ratio: 1.1`}></span>
                </a>
            </td>
            <td className="uk-width-auto">
                <a className="uk-icon-button uk-button-secondary" href={`/info/${props.todo.id}`}>
                    <span uk-icon="icon: info; ratio: 1.1"></span>
                </a>
            </td>
        </tr>
    );
};

export default TodoListItem;