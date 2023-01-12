import { TOKEN_REMOVE, TOKEN_SET, USER_GROUP_REMOVE, USER_GROUP_SET } from "../types/userTypes"

export const addTokenAC = (token) => ({
    type: TOKEN_SET,
    payload: token
})

export const removeTokenAC = () => ({
    type: TOKEN_REMOVE,
})

export const addUserGroupAC = (userGroupe) => ({
    type: USER_GROUP_SET,
    payload: userGroupe,
})

export const removeUserGroupAC = () => ({
    type: USER_GROUP_REMOVE,
})