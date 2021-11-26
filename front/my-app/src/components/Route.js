import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import history from '../components/history';
import RegistrationForm from '../pages/Registration'
import LoginForm from '../pages/Login'
import VideoUpload from "../pages/VideoUpload";
import VideoUploaded from "../pages/VideoUploaded";
import Home from  "../pages/Home";
import NavBar from "../components/NavBar";

const Routs = () => {
    console.log(localStorage.user)
    return (
        <>
            <Router history={history}>
                <NavBar/>
                <Switch>
                    <Route path="/" exact component={Home}/>
                    { localStorage.user &&
                    <Route path="/login">
                        <Redirect to="/"/>
                    </Route> }
                    { !localStorage &&
                    <Route path="/logout">
                        <Redirect to="/"/>
                    </Route> }
                    <Route path="/login" component={LoginForm}/>
                    <Route path="/registration" component={RegistrationForm}/>
                    <Route path="/ulpoad-video" component={VideoUpload}/>
                    <Route path="/uploaded-video" component={VideoUploaded}/>
                </Switch>
            </Router>
        </>
    );
};

export default Routs;