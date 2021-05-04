import { yupResolver } from '@hookform/resolvers/yup';
import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { } from 'react-router';
import * as yup from 'yup';
import { IServiceContextType } from '../../../contexts/Service/IServiceContext';
import { ServiceContext } from '../../../contexts/Service/ServiceContext';
import { ITodoContextType } from '../../../contexts/Todo/ITodoContextType';
import { TodoContext } from '../../../contexts/Todo/TodoContext';
import Service from '../../../models/Service.model';
import Todo from '../../../models/Todo/Todo.model';
import { TodoStatusEnum } from '../../../models/Todo/TodoStatusEnum';
import { formatCurrencyMoneyWithSymbols } from '../../../utils/Utils';

interface AddTodoForm {
    service: string
    modelo: string,
    placa: string,
}

const schema = yup.object().shape({
    service: yup.string(),
    modelo: yup.string().required('Modelo da moto inválido'),
    placa: yup.string().required('Placa da moto inválida'),
})

const cssPlus: React.CSSProperties = {
    padding: '7px',
}

const cssMarginBottomUnset: React.CSSProperties = {
    marginBottom: 'unset',
    marginLeft: '2%',
}

const cssSelect: React.CSSProperties = {
    width: '85%'
}

const cssButtonSave: React.CSSProperties = {
    borderRadius: '10px',
    marginLeft: '10px',
}


function AddTodo(props?: any) {
    let editMode = false;
    let viewMode: boolean = false;
    let idEdit: string = "";
    let todoEdit: Todo | null;
    let arrayServiceStandart: Service[] = []
    let newStatus: TodoStatusEnum | null;
    let textButtonConfirm: string = "Salvar"

    const getNewStatus = () => {
        switch (props.match.path) {
            case '/prefinished/:id':
                newStatus = TodoStatusEnum.pre_finalizado;
                textButtonConfirm = "Pré finalizar";
                break;
            case '/finished/:id':
                newStatus = TodoStatusEnum.finalizado
                textButtonConfirm = "Finalizar";
                break;
            case '/info/:id':
                viewMode = true;
                editMode = false;
                break;
        }
    }

    const { register, handleSubmit, setValue, formState: { errors }, getValues } = useForm({
        resolver: yupResolver(schema),
    });
    const { addTodo, editTodo, getItem } = useContext<ITodoContextType>(TodoContext);

    if (props && props.match) {
        const { id } = props.match.params;
        idEdit = id ? id : -1;
        if (!!id) {
            editMode = true;
            todoEdit = getItem(idEdit);
            if (todoEdit) {
                const fields = ['service', 'placa', 'modelo'];
                setValue(fields[1], todoEdit.placa);
                setValue(fields[2], todoEdit.modelo);
                arrayServiceStandart = todoEdit.services;
                getNewStatus();
            }
        }
    }

    const { getList } = useContext<IServiceContextType>(ServiceContext);
    const serviceList = getList({ totalCount: 0, page: 0, pageSize: 1000, order: 'asc' });
    const fieldsTable = ['Serviço', 'Valor', ''];
    const [listServiceTodo, setListServiceTodo] = useState<Service[]>(arrayServiceStandart)
    const [valorTotal, setValorTotal] = useState<number>(0)

    useEffect(() => {
        let valTotal: number = 0.00;
        listServiceTodo.forEach((item) => valTotal += Number(item.value));
        setValorTotal(valTotal);
    }, [listServiceTodo])

    const onSubmit = (data: AddTodoForm, e: any) => {
        if (!editMode && !viewMode) {
            addTodo(listServiceTodo, valorTotal, data.placa, data.modelo);
            e.target.reset();
            window.location.href = '/todo';
        } else if (editMode) {
            if (todoEdit) {
                let newTodo = new Todo(
                    todoEdit.id,
                    listServiceTodo,
                    valorTotal,
                    data.placa,
                    data.modelo,
                    todoEdit.date,
                    newStatus ? newStatus : todoEdit.status
                );
                editTodo(newTodo);
            }
            e.target.reset();
            window.location.href = '/todo';
        };

    };

    const addItemSeviceList = () => {
        let field = 'service';
        let idService = getValues(field);
        if (idService) {
            let indexService = listServiceTodo.find(item => item.id === idService);
            if (!indexService) {
                let newService = serviceList.data?.find((item: Service) => item.id === idService);
                setListServiceTodo([...listServiceTodo, newService]);
            }
            setValue(field, undefined);
        }
    }

    const removeSeviceList = (service: Service) => {
        let newListServices = listServiceTodo.filter(item => item.id !== service.id);
        setListServiceTodo(newListServices);
    }

    const styleIconTrash = () => {
        if (viewMode && todoEdit?.status != TodoStatusEnum.finalizado) {
            return { display: 'none' };
        }
        return {};
    }

    return (
        <>
            <div className="uk-margin uk-flex uk-flex-right">
                <a onClick={() => props.history.goBack()} className="uk-icon-button uk-button-secondary">
                    <span uk-icon="icon: arrow-left; ratio: 1.5"></span>
                </a>
            </div>
            <form onSubmit={handleSubmit<AddTodoForm>(onSubmit)} className="uk-margin-large-bottom ">
                <fieldset className="uk-fieldset">
                    <legend className="uk-width-1-1">
                        <h4>{(editMode ? 'Editar ' : viewMode ? 'Detalhes ' : 'Nova ') + 'Ordem de Pedido'}
                            <div className="uk-align-right" style={styleIconTrash()}>
                                <a onClick={() => { }} className="uk-icon-button uk-button-danger">
                                    <span uk-icon="icon: trash; ratio: 1.2"></span>
                                </a>
                            </div>
                        </h4>
                    </legend>
                    <div className="uk-margin uk-width-1-2">
                        <div className="uk-inline uk-width-1-1">
                            <select  {...register("service")} className='uk-select' style={cssSelect} name="service" id="service">
                                <option key={999999} value="">Selecione</option>
                                {
                                    serviceList.data?.map((item: Service, index) => {
                                        return (
                                            <option key={index} value={item.id}>{item.service + " - " + formatCurrencyMoneyWithSymbols(item.value)}</option>
                                        );
                                    })
                                }
                            </select>
                            <div className="uk-align-right" style={(viewMode ? { display: 'none' } : cssMarginBottomUnset)} >
                                <a onClick={addItemSeviceList} className="uk-icon-button uk-button-secondary" style={cssPlus} href="#">
                                    <span uk-icon="icon: plus; ratio: 1.5"></span>
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="uk-margin uk-width-1 uk-flex ">

                        <div className="uk-width-1-3">
                            <input className="uk-input" {...register("modelo")} type="text" name="modelo" id="modelo" placeholder="Informe a modelo da moto" />
                            <span><small><strong className="uk-text-danger">{errors.modelo?.message}</strong></small></span>
                        </div>

                        <div className="uk-width-1-4 uk-margin-medium-left" >
                            <input className="uk-input" {...register("placa")} type="text" name="placa" id="placa" placeholder="Informe a placa da moto" />
                            <span><small><strong className="uk-text-danger">{errors.placa?.message}</strong></small></span>
                        </div>

                    </div>

                    <div className="uk-margin uk-width-1-1">
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
                                    listServiceTodo.map((item, index) => {
                                        return (
                                            <tr key={index} className="uk-animation-slide-bottom-medium">
                                                <td className="uk-width-auto">
                                                    {item.service}
                                                </td>
                                                <td className="uk-width-auto">
                                                    {formatCurrencyMoneyWithSymbols(item.value)}
                                                </td>
                                                <td className="uk-width-auto">
                                                    <a onClick={() => { removeSeviceList(item) }} className="uk-icon-button uk-button-danger" style={(viewMode ? { display: 'none' } : cssPlus)} href="#">
                                                        <span uk-icon="icon: trash; ratio: 1.5"></span>
                                                    </a>
                                                </td>
                                            </tr>
                                        );
                                    })
                                }
                            </tbody>
                        </table>
                        <hr ></hr>
                        <span><small><strong className="uk-text-danger">{errors.service?.message}</strong></small></span>

                        <div style={(valorTotal == 0 ? { display: 'none' } : {})}>
                            <div className="uk-flex uk-flex-left">
                                <span><h4 className="uk-text-muted">Total: </h4></span>
                                <span className="uk-margin-small-left"><h4 className="uk-text-muted">{formatCurrencyMoneyWithSymbols(valorTotal)}</h4></span>
                            </div>
                        </div>
                    </div>

                    <div className="uk-flex uk-flex-right" style={(viewMode ? { display: 'none' } : {})}>
                        <a href="/todo" className="uk-button uk-button-danger" style={cssButtonSave}>
                            <span>Cancelar</span>
                        </a>
                        <button type="submit" className="uk-button uk-button-secondary" style={cssButtonSave}>{textButtonConfirm}</button>
                    </div>
                </fieldset>
            </form >
        </>
    );
};

export default AddTodo;

