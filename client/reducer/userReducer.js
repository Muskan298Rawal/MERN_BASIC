const initialState = {
    user: ""
}

const userReducer = function (state = initialState, action) {
    switch (action.type) {
        case "SET_USER": {
            return {
                ...state,
                user: action.payload,
            };
        }
        case "REMOVE_USER": {
            return {
                ...state,
                user: action.payload,
            };
        }
        default: {
            // debugger
            return state
        }
    }
}
export default userReducer;