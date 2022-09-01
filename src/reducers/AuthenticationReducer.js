export const ACTIONS = {
    UPDATE_USERNAME : "update-username",
    UPDATE_PASSWORD : "update-password",
    UPDATE_USER: "update-user",
}

export const authenticationReducer = (state, action) => {
    switch(action.type){
        case ACTIONS.UPDATE_USERNAME: {
            return {...state, username: action.payload.value};
        }
        case ACTIONS.UPDATE_PASSWORD: {
            return {...state, password: action.payload.value};
        }
        case ACTIONS.UPDATE_USER: {
            return action.payload.loginCredentials;
        }

        default: {
            return state;
        }
    }
}