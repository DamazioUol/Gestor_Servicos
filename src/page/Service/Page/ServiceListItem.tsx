import React, { useContext } from 'react';
import { IServiceContextType } from '../../../contexts/Service/IServiceContext';
import { ServiceContext } from '../../../contexts/Service/ServiceContext';
import Service from '../../../models/Service.model';
import { formatCurrencyMoneyWithSymbols, formatDateWithHours } from '../../../utils/Utils';

interface ServiceListItemProps {
    service: Service
}

export default function ServiceListItem(props: ServiceListItemProps) {
    const { removeService } = useContext<IServiceContextType>(ServiceContext);

    return (
        <tr className="uk-animation-slide-bottom-medium">
            <td className="uk-width-1-3">{props.service.service}</td>
            <td className="uk-width-1-6">{formatCurrencyMoneyWithSymbols(props.service.value)}</td>
            <td className="uk-width-1-6">{formatDateWithHours(props.service.date)}</td>
            <td className="uk-width-1-6">{formatDateWithHours(props.service.modified)}</td>

            <td className="uk-width-auto">
                <button onClick={() => removeService(props.service)} className="uk-icon-button uk-button-danger" uk-icon="trash"></button>
            </td>
            <td className="uk-width-auto">
                <a className="uk-icon-button uk-button-primary" href={`/editService/${props.service.id}`}>
                    <span uk-icon="icon: pencil; ratio: 1.1"></span>
                </a>
            </td>
        </tr>
    )
}
