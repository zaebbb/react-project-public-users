import React, {useState} from 'react';
import axios from 'axios'

const Auth = () => {

    const api = process.env.REACT_APP_API + 'auth'

    const [loginValueState, setLoginValueState] = useState();
    const [errorValidateLoginState,setErrorValidateLoginState] = useState();
    const [errorValidatePasswordState,setErrorValidatePasswordState] = useState();
    const [passwordValueState, setPasswordValueState] = useState();
    const [accountingState, setAccountingState] = useState()

    const fetchData = async () => {
        let token = localStorage.getItem('authorization')
        const result = await axios({
            url: api,
            method: 'POST',
            data: {
                name: loginValueState,
                password: passwordValueState
            },
            headers: {
                'authorization': token
            }
        }).catch(e => {
            setAccountingState(e.response.data.message)
            console.log(e.response)
        })
        if(result){
            if(result.headers.authorization === undefined || result.headers.authorization === null){
                localStorage.setItem('authorization', result.data.bearerToken);
                window.location.assign('/');
            }
        }

    }

    function validate(e, message, state, sendMessage){
        sendMessage(e.target.value)
        if(e.target.value.trim() === ''){
            state(message);
        } else {
            state('');
        }
    }

    function sendData(e){
        e.preventDefault();
        fetchData();
    }

    return (
        <div>
            <form method={'POST'} onSubmit={sendData}>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Ваш логин</label>
                    <input type="text" className="form-control" placeholder="Введите ваш логин"
                           onInput={(e) => validate(e,'Поле логина обязательно к заполнению', setErrorValidateLoginState,setLoginValueState)} />
                    <div className="text-danger">{errorValidateLoginState}</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Ваш пароль</label>
                    <input type="password" className="form-control" placeholder="Введите ваш пароль"
                           onInput={(e) => validate(e, 'Поле пароля обязательно к заполнению', setErrorValidatePasswordState,setPasswordValueState)} />
                    <div className="text-danger">{errorValidatePasswordState}</div>
                </div>
                <div className="col-auto">
                    <button type="submit" className="btn btn-dark mb-3">Авторизоваться</button>
                </div>
                <div className="text-danger">{accountingState}</div>
            </form>
        </div>
    );
};

export default Auth;
