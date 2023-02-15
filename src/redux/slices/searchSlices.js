import { createSlice } from "@reduxjs/toolkit"
import { getInitialState } from "../initialStore"


const searchSlice = createSlice({
    name: 'search',
    initialState: getInitialState().search,
    reducers: {
        setSearch: (state, action) => action.payload
    },
  })

  export const { setSearch } = searchSlice.actions
  export const searchReducer = searchSlice.reducer

