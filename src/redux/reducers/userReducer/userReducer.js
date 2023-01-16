import { TOKEN_REMOVE, TOKEN_SET, USER_GROUP_REMOVE, USER_GROUP_SET } from "../../types/userTypes";

export const userReducer = (
    state = {
    group: "",
    token: "",
    }, 
    action) => {
    switch (action.type) {
        case TOKEN_SET:
            return {...state, token: action.payload };
        case TOKEN_REMOVE:
            return {...state, token: "" };
        case USER_GROUP_SET:
            return {...state, group: action.payload}
        case USER_GROUP_REMOVE:
            return {...state, group: ""};
    default:
        return state;
    }
};