export const ACTIONS = {
    UPDATE_USERNAME : "update-username",
    UPDATE_PASSWORD : "update-password",
    UPDATE_USER: "update-user",
    UPDATE_METAMASK: "update-metamask",
    UPDATE_BALANCE: "update-balance",
    LOGOUT: "logout",
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
            return {...state, username: action.payload.loginCredentials.username, password: action.payload.loginCredentials.password};
        }
        case ACTIONS.UPDATE_METAMASK: {
            return{...state, selectedMetamaskAccount: action.payload.selectedMetamaskAccount}
        }
        case ACTIONS.UPDATE_BALANCE: {
            return{...state, accountBalance: action.payload.accountBalance}
        }
        case ACTIONS.LOGOUT: {
            return { ...state, selectedMetamaskAccount:null, accountBalance: null }
        }

        default: {
            return state;
        }
    }
}