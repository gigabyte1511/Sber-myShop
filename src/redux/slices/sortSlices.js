import { createSlice } from "@reduxjs/toolkit"
import { getInitialState } from "../initialStore"


const sortSlice = createSlice({
    name: 'sort',
    initialState: getInitialState().sort,
    reducers: {
        setSort: (state, action) => action.payload
    },
  })

  export const { setSort } = sortSlice.actions
  export const sortReducer = sortSlice.reducer

