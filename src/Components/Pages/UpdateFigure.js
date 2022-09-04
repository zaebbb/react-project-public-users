import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router'
import axios from 'axios'
import {Link} from 'react-router-dom'

const UpdateFigure = () => {

    const {id} = useParams()

    const apiFigure = process.env.REACT_APP_API + 'figures/' + id
    const apiFigureUp = process.env.REACT_APP_API + 'figures/' + id + '/up'

    const [figureDataState, setFigureDataState] = useState()

    const [nameState, setNameState] = useState()
    const [descrState, setDescrState] = useState()
    const [jobState, setJobState] = useState()
    const [imageState, setImageState] = useState()

    function nameCheck(e){
        setNameState(e.target.value);
    }
    function descrCheck(e){
        setDescrState(e.target.value);
    }
    function jobCheck(e){
        setJobState(e.target.value);
    }
    function imageCheck(e){
        setImageState(e.target.files[0]);
    }

    const fetchData = async () => {
        const result = await axios({
            method: 'GET',
            url: apiFigure
        })
        setFigureDataState(result.data.figure[0])
    }

    const formSend = async () => {
        const formDatas = new FormData();
        formDatas.append('figureName', nameState);
        formDatas.append('descr', descrState);
        formDatas.append('job', jobState);
        formDatas.append('photoProfile', imageState);

        const result = await axios({
            url: apiFigureUp,
            method: 'POST',
            data: formDatas,
            headers: {
                'authorization': localStorage.getItem('authorization')
            }
        });
        console.log(result)
    }

    useEffect(() => {
        fetchData().then(r => {})
    }, [])

    function sendData(e){
        e.preventDefault();

        formSend().then(r => {})
    }

    return (
        <div>
            {
                figureDataState ?
                        <form className="d-flex flex-column" onSubmit={sendData}>
                            <div className="mb-3">
                                <label className="form-label">Имя публичной личности</label>
                                <input type="text" className="form-control" placeholder={figureDataState.figureName} onInput={nameCheck} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Работа публичной личности</label>
                                <input type="text" className="form-control" placeholder={figureDataState.job} onInput={jobCheck} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Описание публичной личности</label>
                                <input type="text" className="form-control" placeholder={figureDataState.descr} onInput={descrCheck} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="formFile" className="form-label">Изображение публичной личности</label>
                                <input className="form-control" type="file" id="formFile" onChange={imageCheck}  />
                            </div>
                            <div className="col-auto">
                                <button type="submit" className="btn btn-dark mb-3">Создать</button>
                            </div>
                                <h3>Прошлое изображение</h3>
                                <img style={{width: "200px"}} className="mt-3" src={process.env.REACT_APP_API_IMAGE + figureDataState.photoProfile} alt=""/>

                        </form> : <h1>Загрузка</h1>
            }
        </div>
    );
};

export default UpdateFigure;
