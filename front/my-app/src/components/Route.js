import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import history from '../components/history';
import RegistrationForm from '../pages/Registration';
import LoginForm from '../pages/Login';
import VideoUpload from "../pages/VideoUpload";
import VideoUploaded from "../pages/VideoUploaded";
import Home from  "../pages/Home";
import NavBar from "../components/NavBar";
import {useUser} from '../hooks/useUser';

const Routs = () => {
    const {isLoggedIn} = useUser();
    return (
        <>
            <Router history={history}>
                <NavBar/>
                <Switch>
                    <Route path="/" exact component={Home}/>
                    { isLoggedIn &&
                    <Route path="/login">
                        <Redirect to="/"/>
                    </Route> }
                    { !isLoggedIn &&
                    <Route path="/logout">
                        <Redirect to="/"/>
                    </Route> }
                    { isLoggedIn &&
                    <Route path="/registration">
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