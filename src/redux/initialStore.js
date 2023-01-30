
export function getInitialState(){
    let initialState = {
        cart: [],
        favourite: [],
        search: "",
        user:{
            group: "",
            token: "",
            id: "",
        } 
    };
    if(localStorage.getItem("state") !== null) {
        const {cart, favourite, search, user} = JSON.parse(localStorage.getItem("state"));
        initialState.cart = cart;
        initialState.user.token = user.token;
        initialState.user.group = user.group;
        initialState.user.id = user.id;
        initialState.favourite = favourite;
    }

    return initialState;
}