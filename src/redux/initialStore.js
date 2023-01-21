
export function getInitialState(){
    let initialState = {
        cart: [],
        favourite: [],
        search: "",
        user:{
            group: "",
            token: "",
        } 
    };
    if(localStorage.getItem("state") !== null) {
        const {cart, favourite, search, user} = JSON.parse(localStorage.getItem("state"));
        initialState.cart = cart;
        initialState.user.token = user.token;
        initialState.user.group = user.group;
        initialState.favourite = favourite;
    }

    return initialState;
}