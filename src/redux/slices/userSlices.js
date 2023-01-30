import { createSlice } from "@reduxjs/toolkit"
import { getInitialState } from "../initialStore";

const userSlice = createSlice({
    name: 'user',
    initialState: { group: getInitialState().user.group, token: getInitialState().user.token, id: getInitialState().user.id},
    reducers: {
        setToken: (state, action) => ({...state, token: action.payload}),
        removeToken: (state, action) => ({...state, token: ""}),
        setUserGroup: (state, action) => ({...state, group: action.payload}),
        removeUserGroup: (state, action) => ({...state, group: ""}),
        setUserID: (state, action) => ({...state, id: action.payload}),
        removeUserID: (state, action) => ({...state, id: ""}),

    },
  });
  export const { setToken, removeToken, setUserGroup, removeUserGroup, setUserID, removeUserID } = userSlice.actions;
  export const userReducer = userSlice.reducer;

