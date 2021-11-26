export const getUser = async dispatch => {
    await axios
        .post('http://localhost:3000/login', {
        .then(res => {
            const result = res.data;
            dispatch({
                type: "SET_USER",
                payload: result
            });
        })
        .catch(error => {
            const result = error;
            dispatch({
                type: "SET_ERROR",
                payload: {
                    error: true,
                    message: result
                }
            });
        });