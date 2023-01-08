import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux"
import { getProductsByIds } from "../../API/query";
import Loader from "../Loader/Loader";
import { PlaceHolder } from "../PlaceHolder/PlaceHolder";
import { ProductInCart } from "./ProductInCart/ProductInCart"
import styles from "./styles.module.css"
import { TotalContainer } from "./TotalContainer/TotalContainer";
import emptyCart from "./img/emptyCart.svg"
import { CartHeader } from "./CartHeader/CartHeader";

export const GET_PRODUCTS_BY_ID_QUERY_KEY ='GET_PRODUCTS_BY_ID_QUERY_KEY';

export function Cart(){
    const cart = useSelector((store) => store.cart);
    const {data, error, isLoading, isSuccess, isError, } = useQuery({ 
        queryKey: [GET_PRODUCTS_BY_ID_QUERY_KEY, cart.map((cartItem) => cartItem.id)], 
        queryFn: getProductsByIds
    }); 

    if(isLoading) return <Loader />
    if(isError) return <p>{`${error}`}</p>
    if(isSuccess) {
        if(data.length === 0) return <PlaceHolder text = "Cart is empty" image = {emptyCart}/>
        const jsx = data.map((elem) => <ProductInCart params = {elem}/>)
        return (
            <div className = {styles.container}>
                <div className={styles.left}>
                    <CartHeader />
                    <div className = {styles.productList}>
                        {jsx}
                    </div>
                </div>
                <TotalContainer />
            </div>
        );
    }
}