import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getProductsByWord} from "../../API/query";
import { UsualButton } from "../Buttons/UsualButton/UsualButton";
import Loader from "../Loader/Loader";
import { Product } from "../Product/Product"
import styles from './styles.module.css'


export const GET_PRODUCTS_QUERY_KEY ='PRODUCTS_QUERY_KEY';

function Main(){
    const searchString = useSelector((store) => store.search);
    const token = useSelector((store) => store.user.token);
    console.log("Token", token);

    const navigate = useNavigate();

    const {data, error, isLoading, isSuccess, isError} = useQuery({ 
        queryKey: [GET_PRODUCTS_QUERY_KEY, searchString, token], 
        queryFn: getProductsByWord
    }); 

    function prepareToSignIn(){
        navigate("/sign");
    }

    if(isLoading) return <Loader />
    if(isError) return (
        <>
            <p>{`${error}`}</p>
            <UsualButton text = {"Sing In"} do = {prepareToSignIn} />
        </>
        );
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