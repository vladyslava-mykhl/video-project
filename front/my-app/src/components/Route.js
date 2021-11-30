import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import history from '../components/history';
import Logout from '../components/Logout'
import RegistrationForm from '../pages/Registration';
import LoginForm from '../pages/Login';
import VideoUpload from "../pages/VideoUpload";
import VideoUploaded from "../pages/VideoUploaded";
import Home from  "../pages/Home";
import Video from  "../pages/Video";
import NavBar from "../components/NavBar";
import {useUser} from '../hooks/useUser';

const Routs = () => {
    const {isLoggedIn} = useUser();
    return (
        <>
            <Router history={history}>
                <NavBar/>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route path="/logout" >
                        {!isLoggedIn ? <Redirect to="/"/> : <Logout/>}
                    </Route>
                    <Route path="/login">
                        {isLoggedIn ? <Redirect to="/"/> : <LoginForm/>}
                    </Route>
                    <Route path="/registration">
                        {isLoggedIn ? <Redirect to="/"/> : <RegistrationForm/>}
                    </Route>
                    <Route path="/ulpoad-video">
                        {isLoggedIn ? <VideoUpload/> : <Redirect to="/login"/>}
                    </Route>
                    <Route path="/get-all-video" component={Video}/>
                    <Route path="/uploaded-video" component={VideoUploaded}/>
                </Switch>
            </Router>
        </>
    );
};

export default Routs;