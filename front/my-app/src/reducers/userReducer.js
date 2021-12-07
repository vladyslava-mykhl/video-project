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
        default:
            return state;
    };
};

export default UserReducer;