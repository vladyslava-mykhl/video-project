import  Routs from './components/Route';
import React from 'react';
import UserContextProvider from './context/UserContext';

function App() {
    return (
        <UserContextProvider>
            <Routs/>
        </UserContextProvider>
    );
};

export default App;