const UserReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                isLoggedIn: true,
                userId: action.payload.userId,
                userName: action.payload.userName
            };
        case "LOGOUT":
            return {
                isLoggedIn: false,
                userId: "",
                userName: ""
            };
        // case "ERROR":
        //     return {
        //         ...state,
        //         error: action.payload.error,
        //         message: action.payload.message
        //     };
        default:
            return state;
    };
};

export default UserReducer;