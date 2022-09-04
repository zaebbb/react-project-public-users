import React, {useEffect, useState} from 'react';
import axios from 'axios'

const MainPage = () => {

    const api = process.env.REACT_APP_API + 'figures'

    const [publicFiguresState, setPublicFiguresState] = useState();
    const fetchData = async () => {
        const result = await axios.get(api);
        setPublicFiguresState(result);
    }

    useEffect(() => {
        fetchData().then(r => {});
    }, [])

    return (
        <div>
            <h1>Публичные личности</h1>
            <div className="row">
                {
                    publicFiguresState && publicFiguresState.data.figures[0].map((el, key) => {
                        return (
                            <a className="card" style={{width: '18rem'}} key={key} href={'/figures/' + el.id}>
                                <img src={process.env.REACT_APP_API_IMAGE + el.photoProfile} className="card-img-top imageFigures" alt="..." />
                                <div className="card-body">
                                    <h5 className="card-title">{el.figureName}</h5>
                                    <p className="card-text">{el.descr}</p>
                                </div>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item">{el.job}</li>
                                </ul>
                            </a>
                        )
                    }) || <div>
                        <h1>Загрузка...</h1>
                    </div>
                }
            </div>

        </div>
    );
};

export default MainPage;
