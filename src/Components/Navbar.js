import React, {useEffect, useState} from 'react';
import axios from 'axios'

const Navbar = initialState => {

    function clearLogin(){
        localStorage.clear('authorization');
        window.location.reload();
    }

    const [adminState, setAdminState] = useState();

    let idToken = localStorage.getItem('authorization')
    if(idToken){
        idToken = idToken.slice(60)
    }


    const fetchData = async () => {
        const result = await  axios({
            method: 'GET',
            url: process.env.REACT_APP_API + 'users/' + idToken,
            headers: {
                'authorization': localStorage.getItem('authorization')
            }
        })
        setAdminState(result?.data?.user[0]?.name)
    }

    useEffect(() => {
        fetchData().then(r => {})
    }, [])


    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">Navbar</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="/auth">Authorize</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link active" href="/reg">Register</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link active" href="/messages" tabIndex="-1">Messages</a>
                        </li>
                        {
                            localStorage.getItem('authorization') !== '' && localStorage.getItem('authorization') !== null ?
                                <div>
                                    <li className="nav-item">
                                        <a className="nav-link active" href="#" tabIndex="-1" onClick={clearLogin}>Exit</a>
                                    </li>
                                </div>
                                : ''
                        }
                        {
                            adminState ?
                                <div>
                                    <li className="nav-item">
                                        <a className="nav-link active" href="/admin" tabIndex="-1">Admin</a>
                                    </li>
                                </div>
                                : ''
                        }
                    </ul>
                    <form className="d-flex">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-success" type="submit">Search</button>
                    </form>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
