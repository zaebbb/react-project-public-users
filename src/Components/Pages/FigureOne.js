import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router'
import axios from 'axios'

const FigureOne = () => {

    let token = localStorage.getItem('authorization')

    const [checkTokenState, setCheckTokenState] = useState();

    if(token){
        token = token.slice(60)
    }
    const fetchData_user = async () => {
        const result = await axios({
            method: 'GET',
            url: process.env.REACT_APP_API + 'users/' + token,
            headers: {
                'authorization': localStorage.getItem('authorization')
            }
        })
        setCheckTokenState(result?.data?.user[0]?.name)
    }

    const [oneFigureState, setOneFigureState] = useState()

    const {id} = useParams();
    let api = process.env.REACT_APP_API + `figures/${id}`
    const fetchData = async () => {
        const result = await axios.get(api);
        setOneFigureState(result);
        console.log(result)
    }

    useEffect(() => {
        fetchData().then(r => {})
        fetchData_user().then(r => {})
    }, [])

    function deleteFigure(){
        let delApi = api + '/del';
        const result = axios({
            url: delApi,
            method: 'POST',
            headers: {
                'authorization': localStorage.getItem('authorization')
            }
        })
        console.log(result)
        setTimeout(() => window.location.assign('/'), 1000)

    }

    return (
        <div>
            {
                oneFigureState && oneFigureState.data.figure.map((el, key) => {
                    return (
                        <div className="d-flex flex-column justify-content-start align-items-start" key={key}>
                            <h1>{el.figureName}</h1>
                            <p>{el.descr}</p>
                            <span>{el.job}</span><br/>
                            <img style={{width: "150px"}} src={process.env.REACT_APP_API_IMAGE + el.photoProfile}/>
                            {
                                checkTokenState == 'admin' ?
                            <div className="button-group d-flex mt-3">
                                <a href={'/figures/' + id + '/up'} className="btn btn-warning me-3">Обновить</a>
                                <button onClick={deleteFigure} type="button" className="btn btn-danger">Удалить</button>
                            </div> : ''
                            }
                        </div>
                    )
            }) || <div>
                    <h1>Загрузка...</h1>
                </div>
            }
        </div>
    );
};

export default FigureOne;
