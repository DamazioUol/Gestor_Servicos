import { yupResolver } from '@hookform/resolvers/yup';
import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { IServiceContextType } from '../../../contexts/Service/IServiceContext';
import { ServiceContext } from '../../../contexts/Service/ServiceContext';
import Service from '../../../models/Service.model';


interface AddServiceForm {
    service: string,
    value: string,
}

const schema = yup.object().shape({
    service: yup.string().required('Serviço inválido'),
    value: yup.string().required('Valor inválido'),
})

function AddService(props?: any) {
    let editMode: boolean = false;
    let idEdit: string = "";

    if (props && props.match) {
        const { id } = props.match.params;
        idEdit = id ? id : -1;
        editMode = !!id;
    }

    const { addService, editService, getInfo } = useContext<IServiceContextType>(ServiceContext);
    const [serviceEdit, setServiceEdit] = useState<Service | null>();

    const { register, handleSubmit, setValue, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });
    const onSubmit = (data: AddServiceForm, e: any) => {
        if (!editMode) {
            addService(data.service, data.value);
        } else {
            editService(data.service, data.value, serviceEdit?.id);
        }
        e.target.reset();
        window.location.href = '/service';
    };

    const cssButtonSave: React.CSSProperties = {
        borderRadius: '10px',
        marginLeft: '10px',
    }

    useEffect(() => {
        if (editMode) {
            let service = getInfo(idEdit);
            const fields = ['service', 'value'];
            setValue(fields[0], service?.service);
            setValue(fields[1], service?.value);
            setServiceEdit(service);
        }

    }, []);

    return (
        <>
            <div className="uk-margin uk-flex uk-flex-right" >
                <a uk-tooltip="Voltar" onClick={() => props.history.goBack()} className="uk-icon-button uk-button-secondary">
                    <span uk-icon="icon: arrow-left; ratio: 1.5"></span>
                </a>
            </div>
            <form onSubmit={handleSubmit<AddServiceForm>(onSubmit)}>
                <h4>{editMode ? 'Editar Serviço' : 'Novo Serviço'}</h4>
                <div className="uk-margin uk-width-1-1">
                    <input className="uk-input" {...register("service")} type="text" name="service" id="service" placeholder="Informe a descrição do serviço" />
                    <span><small><strong className="uk-text-danger">{errors.service?.message}</strong></small></span>
                </div>
                <div className="uk-margin uk-width-1-1">
                    <input className="uk-input" {...register("value")} type="text" name="value" id="value" placeholder="Informe o valor do serviço" />
                    <span><small><strong className="uk-text-danger">{errors.value?.message}</strong></small></span>
                </div>
                <div className="uk-margin uk-align-right">
                    <a href="/todo" className="uk-button uk-button-danger" style={cssButtonSave}>
                        <span>Cancelar</span>
                    </a>
                    <button type="submit" className="uk-button uk-button-secondary" style={cssButtonSave}>Salvar</button>
                </div>
            </form>
        </>
    );
}
export default AddService;