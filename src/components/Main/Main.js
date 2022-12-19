import { useQuery } from "@tanstack/react-query";
import { getProducts} from "../../API/query";
import Loader from "../Loader/Loader";
import { Product } from "../Product/Product"
import styles from "./styles.module.css"
//import styles from './styles.module.css'

export const PRODUCTS_QUERY_KEY ='PRODUCTS_QUERY_KEY';

function Main(){
    const {data, error, isLoading, isSuccess, isError} = useQuery({ 
        queryKey: [PRODUCTS_QUERY_KEY], 
        queryFn: getProducts
    }); 

    if(isLoading) return <Loader />
    if(isError) return <p>{`${error}`}</p>
    if(isSuccess) {
        const jsx = [];
        for (let elem of data.products){
            jsx.push(<Product params = {elem} />)
        }
        return (
            <main>
                {jsx}
            </main>
        );
    }
}
export {
    Main,
}