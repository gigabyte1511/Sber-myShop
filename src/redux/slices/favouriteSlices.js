import { createSlice } from "@reduxjs/toolkit"
import { getInitialState } from "../initialStore"


const favouriteSlice = createSlice({
    name: 'favourite',
    initialState: getInitialState().favourite,
    reducers: {
        favouriteAdd: (state, action) => [ action.payload, ...state ],
        favouriteDelete: (state, action) => state.filter((elem)=> elem.id !== action.payload.id),
    },
  })

  export const { favouriteAdd, favouriteDelete } = favouriteSlice.actions
  export const favouriteReducer = favouriteSlice.reducer