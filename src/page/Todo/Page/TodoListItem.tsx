import React from 'react';
import Todo from '../../../models/Todo/Todo.model';
import { formatCurrencyMoneyWithSymbols, formatDateWithHours } from '../../../utils/Utils';

interface TodoListItemProps {
    todo: Todo
}

const TodoListItem = (props: TodoListItemProps) => {
    let statusDescription: string = "";
    let icon: string = "";
    let style: React.CSSProperties = {};
    let urlPath: string = "";
    let tooltip: string = "";

    switch (props.todo.status) {
        case 0:
            statusDescription = "Pendente";
            icon = "check";
            style = { backgroundColor: 'green', color: 'black', border: '1px solid green', };
            urlPath = `/prefinished/${props.todo.id}`;
            tooltip = "Pré finalizar pedido";
            break;
        case 1:
            statusDescription = "Pré finalizado";
            icon = "cart";
            style = { backgroundColor: 'yellow', color: 'black', border: '1px solid yellow', };
            urlPath = `/finished/${props.todo.id}`;
            tooltip = "Finalizar pedido";
            break;
        case 2:
            statusDescription = "Finalizado";
            icon = "ban";
            style = { backgroundColor: 'white', border: '1px solid', };
            urlPath = "#";
            tooltip = "";
            break;
    }


    return (
        <tr className="uk-animation-slide-bottom-medium">
            <td className="uk-width-auto">{props.todo.modelo}</td>
            <td className="uk-width-auto">{props.todo.placa}</td>
            <td className="uk-width-auto">{statusDescription}</td>
            <td className="uk-width-auto">{formatCurrencyMoneyWithSymbols(props.todo.valorTotal)}</td>
            <td className="uk-width-auto">{formatDateWithHours(props.todo.date)}</td>
            <td className="uk-width-auto">{formatDateWithHours(props.todo.modified)}</td>

            <td className="uk-width-auto">
                <a uk-tooltip={tooltip} className={`uk-icon-button`} href={urlPath} style={style}>
                    <span uk-icon={`icon: ${icon}; ratio: 1.1`}></span>
                </a>
            </td>

            <td className="uk-width-auto">
                <a uk-tooltip="Detalhe pedido" className="uk-icon-button uk-button-secondary" href={`/info/${props.todo.id}`}>
                    <span uk-icon="icon: info; ratio: 1.1"></span>
                </a>
            </td>

        </tr>
    );
};

export default TodoListItem;