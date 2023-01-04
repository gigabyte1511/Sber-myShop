import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux"
import { getProductsByIds } from "../../API/query";
import Loader from "../Loader/Loader";
import { ProductInCart } from "./ProductInCart/ProductInCart"
import styles from "./styles.module.css"
import { TotalContainer } from "./TotalContainer/TotalContainer";

export const GET_PRODUCTS_BY_ID_QUERY_KEY ='GET_PRODUCTS_BY_ID_QUERY_KEY';

export function Cart(){
    const cart = useSelector((store) => store.cart);
    // console.log('Cart', cart);
    console.log('Cart', cart.map((cartItem) => cartItem.id));

    const {data, error, isLoading, isSuccess, isError} = useQuery({ 
        queryKey: [GET_PRODUCTS_BY_ID_QUERY_KEY], 
        queryFn: () => getProductsByIds(cart.map((cartItem) => cartItem.id))

    }); 

    if(isLoading) return <Loader />
    if(isError) return <p>{`${error}`}</p>
    if(isSuccess) {
        const jsx = data.map((elem) => <ProductInCart params = {elem}/>)
        return (
            <div className = {styles.container}>
                <div className = {styles.productList}>
                    {jsx}
                </div>
                <TotalContainer />
            </div>
        );
    }
}