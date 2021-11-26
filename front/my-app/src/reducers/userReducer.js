import React from 'react';

export const UserReducer = (state, action) => {
    console.log(state)
    switch (action.type) {
        case 'SET_USER':
            return {
                ...state,
                user: action.payload
            };
        case "SET_ERROR":
            return {
                ...state,
                error: action.payload.error,
                message: action.payload.message
            };
        default:
            return state;
    };
};
