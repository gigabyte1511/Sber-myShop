
export function getInitialState(){
    let initialState = {
        cart: [],
        search: "",
        user:{
            group: "",
            token: "",
        } 
    };
    if(localStorage.getItem("cart") !== null) {
        initialState.cart = JSON.parse(localStorage.getItem("cart"));
    }
    if(localStorage.getItem("token") !== null) {
        initialState.user.token = localStorage.getItem("token");
    }
    if(localStorage.getItem("group") !== null) {
        initialState.user.group = localStorage.getItem("group");
    }
    return initialState;
}