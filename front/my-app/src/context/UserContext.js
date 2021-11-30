import React from 'react';
import UserReducer from '../reducers/userReducer';

export const UserContext = React.createContext();

const initializeState = {
    isLoggedIn: !!localStorage.getItem('user'),
    userId: "",
    userName: ""
};

const UserContextProvider = ({ children }) => {
    const [state, dispatch] = React.useReducer(UserReducer, initializeState);
    return <UserContext.Provider value={{ state, dispatch }}>{children}</UserContext.Provider>;
};

export default UserContextProvider;
