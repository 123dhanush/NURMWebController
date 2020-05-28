import React from 'react';
import logo from './logo.svg';
import './App.css';
import Mapusers from "./components/mapusers";
import { BrowserRouter as Router, Route, Link ,withRouter } from 'react-router-dom';
import Login from "./components/login";
import DisplayPage from "./components/DisplayPage";
import MapRights from "./components/maprights";
import Viewrights from "./components/viewrights";
import Settings from "./components/settings";
import Show from "./components/show";
import Save from "./components/save";
import MapUsersList from "./components/MapUsersList";

function App() {
  return (
    <div className="container-fluid">
      <Router>
            <Route exact path="/" component={Login} />
            <Route exact path="/displaypage" component={DisplayPage} />
            <Route exact path="/mapuserspage" component={Mapusers}/>
            <Route exact path="/maprightspage" component={MapRights}/>
            <Route exact path="/viewrightspage" component={Viewrights}/>
            <Route exact path="/settingspage" component={Settings}/>
            <Route exact path="/mapuserspage/list/listUserMaps" component={MapUsersList} />
            <Route exact path="/mapuserspage/:usermapname" component={Show}/>
            <Route exact path="/mapuserspage/save/:usermapname" component={Save}/>
          

      </Router>
       </div>
  );
}

export default App;
