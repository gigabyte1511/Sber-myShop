import { createSlice } from "@reduxjs/toolkit"
import { getInitialState } from "../initialStore"
import { toast } from "react-toastify";



const cartSlice = createSlice({
    name: 'cart',
    initialState: getInitialState().cart,
    reducers: {
        // cartAdd: (state, action) => {
        //   toast.success("MY SUCCESS");
        //   return [ action.payload, ...state ]},
        cartAdd: (state, action) => [ action.payload, ...state ],
        
        cartDelete: (state, action) => state.filter((elem)=> elem.id !== action.payload.id),
        cartCounterIncrement: (state, action) => state.map((elem)=> elem.id === action.payload.id && elem.count < elem.stock? {...elem, count: elem.count + 1} : elem),
        cartCounterDecrement: (state, action) => state
                            .map((elem)=> elem.id === action.payload.id && elem.count !== 0? {...elem, count: elem.count - 1} : elem)
                            .filter((elem)=> elem.count > 0),
        cartSelect: (state, action) => state
                            .map((elem)=> elem.id === action.payload.id? {...elem, isSelected: true } : elem),
        cartUnselect: (state, action) => state
                            .map((elem)=> elem.id === action.payload.id? {...elem, isSelected: false } : elem),
        cartSelectAll: (state) => state
                            .map((elem)=> ({...elem, isSelected: true})),
        cartUnseceletectAll: (state) => state
                            .map((elem)=> ({...elem, isSelected: false}))
    },
  })

  export const { cartAdd, cartDelete, cartCounterIncrement, cartCounterDecrement, cartSelect, cartUnselect, cartSelectAll, cartUnseceletectAll } = cartSlice.actions
  export const cartReducer = cartSlice.reducer

