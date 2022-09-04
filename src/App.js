import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Navbar from "./Components/Navbar";
import MainPage from "./Components/Pages/Main";
import FigureOne from "./Components/Pages/FigureOne";
import Auth from "./Components/Pages/Auth";
import {useEffect} from "react";

import axios from 'axios';
import CreateFigure from "./Components/Pages/CreateFigure";
import Admin from "./Components/Pages/Admin";
import UpdateFigure from "./Components/Pages/UpdateFigure";

function App() {

    const api = process.env.REACT_APP_API + 'figures'
    const token = localStorage.getItem('authorization')

    const fetchData = async () => {
        const result = await axios({
            method: 'GET',
            url: api,
            headers: {
                'authorization': token
            }
        });

        console.log(result)
    }

    useEffect(() => {
        fetchData().then(r => {})
    }, [])

  return (
    <div className="App">
        <Navbar />
        <div className="container">
            <div className="row">
          <Router>
              <Switch>
                  <Route
                      component={UpdateFigure}
                      path="/figures/:id/up"
                  />
                  <Route
                      component={CreateFigure}
                      path="/createFigure"
                  />
                  <Route
                      component={Admin}
                      path="/admin"
                  />
                  <Route
                      component={Auth}
                      path="/auth"
                  />
                  <Route
                      component={FigureOne}
                      path="/figures/:id"
                  />
                  <Route
                      component={MainPage}
                      path="/"
                  />
              </Switch>
          </Router>
        </div>
        </div>
    </div>
  );
}

export default App;
