import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import history from '../components/history';
import RegistrationForm from '../pages/Registration'
import LoginForm from '../pages/Login'
import VideoUpload from "../pages/VideoUpload";
import VideoUploaded from "../pages/VideoUploaded";
import Home from  "../pages/Home";
import NavBar from "../components/NavBar";

const Routs = () => {
    return (
        <>
            <Router history={history}>
                <NavBar/>
                <Switch>
                    <Route path="/" exact component={Home}/>
                    <Route path="/reg" component={RegistrationForm}/>
                    <Route path="/log" component={LoginForm}/>
                    <Route path="/ulpoad-video" component={VideoUpload}/>
                    <Route path="/uploaded-video" component={VideoUploaded}/>
                </Switch>
            </Router>
        </>
    );
};

export default Routs;