import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { getProductsByWord} from "../../API/query";
import Loader from "../Loader/Loader";
import { Product } from "../Product/Product"
import styles from './styles.module.css'


export const GET_PRODUCTS_QUERY_KEY ='PRODUCTS_QUERY_KEY';

function Main(){
    const searchString = useSelector((store) => store.search);

    const {data, error, isLoading, isSuccess, isError} = useQuery({ 
        queryKey: [GET_PRODUCTS_QUERY_KEY, searchString], 
        queryFn: getProductsByWord
    }); 

    if(isLoading) return <Loader />
    if(isError) return <p>{`${error}`}</p>
    if(isSuccess) {
        const jsx = [];
        for (let elem of data){
            jsx.push(<Product params = {elem} />)
        }
        return (
            <main className={styles.container}>
                {jsx}
            </main>
        );
    }
}
export {
    Main,
}