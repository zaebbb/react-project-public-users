import React, {useState} from 'react';
import axios from 'axios'

const CreateFigure = () => {

    const [nameState, setNameState] = useState()
    const [jobState, setJobState] = useState()
    const [descrState, setDescrState] = useState()
    const [imageState, setImageState] = useState()

    function nameFigure(e){
        setNameState(e.target.value)
    }
    function jobFigure(e){
        setJobState(e.target.value)
    }
    function descrFigure(e){
        setDescrState(e.target.value)
    }
    function imageFigure(e){
        setImageState(e.target.files[0])
    }

    const fetchData = async () => {
        let token = localStorage.getItem('authorization')
        const datas = new FormData();

        datas.append('figureName', nameState)
        datas.append('descr', descrState)
        datas.append('job', jobState)
        datas.append('photoProfile', imageState)

        const result = await axios({
            method: 'POST',
            url: process.env.REACT_APP_API + 'figures',
            data: datas,
            headers: {
                'authorization': token
            }
        });

        console.log(result)
    }

    function sendForm(e){
        e.preventDefault();

        fetchData().then(r => {})
    }

    return (
        <div>
            <form onSubmit={sendForm}>
                <div className="mb-3">
                    <label className="form-label">Имя публичной личности</label>
                    <input type="text" className="form-control" placeholder="Имя публичной личности" onInput={nameFigure} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Работа публичной личности</label>
                    <input type="text" className="form-control" placeholder="Работа публичной личности" onInput={jobFigure} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Описание публичной личности</label>
                    <input type="text" className="form-control" placeholder="Описание публичной личности" onInput={descrFigure} />
                </div>
                <div className="mb-3">
                    <label htmlFor="formFile" className="form-label">Изображение публичной личности</label>
                    <input className="form-control" type="file" id="formFile" onChange={imageFigure} />
                </div>
                <div className="col-auto">
                    <button type="submit" className="btn btn-dark mb-3">Создать</button>
                </div>
            </form>
        </div>
    );
};

export default CreateFigure;
