import { yupResolver } from '@hookform/resolvers/yup';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { ILoginContextType } from '../../contexts/Login/ILoginContext';
import { LoginContext } from '../../contexts/Login/LoginContext';

interface ILogin {
    email: string,
    password: string,
}

const schema = yup.object().shape({
    email: yup.string().required('Campo obrigatório').email('Email inválido'),
    password: yup.string().required('Campo obrigatório').min(5, "Senha deve ter no mínimo 5 caracteres."),
})

function Login(props: any) {

    const { login } = useContext<ILoginContextType>(LoginContext);
    const { register, handleSubmit, setValue, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });
    const [loginValid, SetLoginValid] = useState<boolean>(true);

    const onSubmit = (data: ILogin, e: any) => {
        SetLoginValid(true);
        const valid = login({ email: data.email, password: data.password });
        if (valid) {
            e.target.reset();
            window.location.href = '/';
        } else {
            SetLoginValid(valid);
        }
    };

    return (
        <div className="uk-width-1-1 uk-flex uk-flex-center" style={{ boxShadow: 'initial' }}>
            <div className="uk-card uk-card-default uk-width-1-2@m" style={{ width: '500px' }}>
                <div className="uk-card-header uk-flex uk-flex-center">
                    <h3 className="uk-card-title">Login</h3>
                </div>
                <div className="uk-card-body ">
                    <div className="uk-flex uk-flex-center">
                        <form onSubmit={handleSubmit<ILogin>(onSubmit)}>
                            <div className="uk-margin uk-width-1-1">
                                <input autoComplete="off" className="uk-input" {...register("email")} type="text" name="email" id="email" placeholder="Email" />
                                <div className="uk-flex uk-flex-right">
                                    <span><small className="uk-text-danger">{errors.email?.message}</small></span>
                                </div>
                            </div>
                            <div className="uk-margin uk-width-1-1">
                                <input className="uk-input" autoComplete="off" {...register("password")} type="password" name="password" id="password" placeholder="Senha" />

                                <div className="uk-flex uk-flex-right">
                                    <span><small className="uk-text-danger">{errors.password?.message}</small></span>
                                </div>
                            </div>
                            <div className="uk-flex uk-flex-center">
                                <a href="/register" style={{ color: 'black', fontSize: '12px', marginLeft: '130px' }} >
                                    <span>Registrar-se</span>
                                </a>
                            </div>
                            <div className="uk-margin uk-flex uk-flex-center" >
                                <span><small><strong className="uk-text-danger" style={loginValid ? { display: 'none' } : {}}>Usuário ou senha inválido.</strong></small></span>
                            </div>
                            <div className="uk-margin uk-flex uk-flex-center" >
                                <button type="submit" className="uk-button uk-button-secondary" >Entrar</button>
                            </div>
                        </form>
                    </div>
                    {/* <div className="uk-flex uk-flex-center">
                        <a href="/register" style={{ color: 'black', fontSize: '12px', marginLeft: '130px' }} >
                            <span>Registrar-se</span>
                        </a>
                    </div> */}
                </div>
                {/* <div className="uk-card-footer uk-margin uk-flex uk-flex-center" >
                    <button type="submit" className="uk-button uk-button-secondary" >Entrar</button>
                </div> */}
            </div>
        </div>
    )
}

export default Login
