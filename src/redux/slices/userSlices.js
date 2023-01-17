import { createSlice } from "@reduxjs/toolkit"
import { getInitialState } from "../initialStore";

const userSlice = createSlice({
    name: 'user',
    initialState: { group: getInitialState().user.group, token: getInitialState().user.token },
    reducers: {
        setToken: (state, action) => ({...state, token: action.payload}),
        removeToken: (state, action) => ({...state, token: ""}),
        setUserGroup: (state, action) => ({...state, group: action.payload}),
        removeUserGroup: (state, action) => ({...state, group: ""})
    },
  });
  export const { setToken, removeToken, setUserGroup, removeUserGroup } = userSlice.actions;
  export const userReducer = userSlice.reducer;

