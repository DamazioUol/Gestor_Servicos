import { yupResolver } from '@hookform/resolvers/yup';
import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { RouteComponentProps } from 'react-router-dom';
import * as yup from 'yup';
import { ILoginContextType } from '../../contexts/Login/ILoginContext';
import { LoginContext } from '../../contexts/Login/LoginContext';
import User from '../../models/User';

interface IUserForm {
    userName: string,
    email: string,
    password: string,
    confirmPassword: string,
}

const schema = yup.object().shape({
    userName: yup.string().required('Campo obrigatório'),
    email: yup.string().required('Campo obrigatório').email('Email inválido'),
    password: yup.string().required('Campo obrigatório').min(5, "Senha deve ter no mínimo 5 caracteres."),
    confirmPassword: yup.string().required('Campo obrigatório').min(5, "Senha deve ter no mínimo 5 caracteres.")
})

function AddUser(props: RouteComponentProps) {
    const { registerUser, editUser, getUserCurrent, deleteUser } = useContext<ILoginContextType>(LoginContext);
    const [editMode] = useState<boolean>(props.location.pathname.includes('/editUser'));
    const [errorsForm, SetErrosForm] = useState<string>(null);
    const [userOnline, setUserOnline] = useState<User | null>(null);
    const { register, handleSubmit, setValue, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    useEffect(() => {
        if (editMode) {
            let userOnline = getUserCurrent();
            setValue('userName', userOnline.name);
            setValue('email', userOnline.email);
            setValue('password', userOnline.password);
            setValue('confirmPassword', userOnline.password);
            setUserOnline(userOnline);
        }
    }, [editMode]);

    const onSubmit = (data: IUserForm, e: any) => {
        SetErrosForm(null);
        if (validPassword(data.password, data.confirmPassword)) {
            if (editMode) {
                const newUser = new User(
                    userOnline.id,
                    data.userName,
                    data.email,
                    data.password,
                    userOnline.date
                );
                editUser(newUser);
                e.target.reset();
                window.history.back();
            } else {
                const register = registerUser(data.userName, data.email, data.password);
                if (register) {
                    e.target.reset();
                    window.location.href = "/";
                } else {
                    SetErrosForm('Email já registrado');
                }
            }
        } else {
            SetErrosForm('As senhas não são iguais.');
        }
    };

    const validPassword = (password: string, confirmPassword: string) => {
        return password == confirmPassword;
    }

    return (
        <div className="uk-width-1-1">
            <div className="uk-margin uk-flex uk-flex-right uk-margin-small-bottom" >
                <a uk-tooltip="Voltar" onClick={() => props.history.goBack()} className="uk-icon-button uk-button-secondary">
                    <span uk-icon="icon: arrow-left; ratio: 1.5"></span>
                </a>
            </div>
            <div className="uk-margin uk-flex uk-flex-right uk-margin-small-bottom" style={editMode ? {} : { display: 'none' }} >
                <a uk-tooltip="Apagar conta" onClick={() => deleteUser(userOnline)} className="uk-icon-button uk-button-danger">
                    <span uk-icon="icon: trash; ratio: 1.2"></span>
                </a>
            </div>
            <form onSubmit={handleSubmit<IUserForm>(onSubmit)} className="uk-form uk-margin-large-bottom ">
                <legend className="uk-width-1-1" style={{ marginBottom: 'unset' }}>
                    <h4>{editMode ? "Atualizar Dados" : "Formulário de Cadastro"}</h4>
                </legend>
                <div className="uk-margin uk-width-1-2">
                    <input autoComplete="off" className="uk-input" {...register("userName")} type="text" name="userName" id="userName" placeholder="Nome" />
                    <div className="uk-flex uk-flex-left">
                        <span><small className="uk-text-danger">{errors.userName?.message}</small></span>
                    </div>
                </div>
                <div className="uk-margin uk-width-1-2">
                    <input autoComplete="off" className="uk-input" {...register("email")} type="text" name="email" id="email" placeholder="Email" />
                    <div className="uk-flex uk-flex-left">
                        <span><small className="uk-text-danger">{errors.email?.message}</small></span>
                    </div>
                </div>
                <div className="uk-margin uk-width-1-4">
                    <input className="uk-input" autoComplete="off" {...register("password")} type="password" name="password" id="password" placeholder="Senha" />

                    <div className="uk-flex uk-flex-left">
                        <span><small className="uk-text-danger">{errors.password?.message}</small></span>
                    </div>
                </div>
                <div className="uk-margin uk-width-1-4">
                    <input className="uk-input" autoComplete="off" {...register("confirmPassword")} type="password" name="confirmPassword" id="confirmPassword" placeholder="Confirmar senha" />

                    <div className="uk-flex uk-flex-left">
                        <span><small className="uk-text-danger">{errors.confirmPassword?.message}</small></span>
                    </div>
                </div>
                <div className="uk-flex uk-flex-left">
                    <span><small className="uk-text-danger">{errorsForm}</small></span>
                </div>
                <div className="uk-margin uk-flex uk-flex-right" >
                    <button type="submit" className="uk-button uk-button-secondary" >{editMode ? "Salvar" : "Cadastrar"}</button>
                </div>
            </form>
        </div>
    )
}

export default AddUser
