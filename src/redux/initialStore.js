
export function getInitialState(){

    let initialState = {
        cart: [],
        favourite: [],
        search: "",
        sort: "Disable",
        user:{
            group: "",
            token: "",
            id: "",
        } 
    };
    if(localStorage.getItem("state") !== null) {
        const {cart, favourite, user} = JSON.parse(localStorage.getItem("state"));
        initialState.cart = cart;
        initialState.user.token = user.token;
        initialState.user.group = user.group;
        initialState.user.id = user.id;
        initialState.favourite = favourite;
    }
    const searchParams = new URLSearchParams(window.location.search);
    if(searchParams.get("search")){
        initialState.search = searchParams.get("search")
    }
    if(searchParams.get("sort")){
        initialState.sort = searchParams.get("sort")
    }

    return initialState;
}