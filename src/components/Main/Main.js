import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getProductsByWord} from "../../API/query";
import { UsualButton } from "../Buttons/UsualButton/UsualButton";
import Loader from "../Loader/Loader";
import styles from './styles.module.css'
import {ReactComponent as NotFoundPic} from './notFound.svg'
import { FilterBar } from "../FilterBar/FilterBar";
import { sortData } from "../services/services";


export const GET_PRODUCTS_QUERY_KEY ='PRODUCTS_QUERY_KEY';

function Main(){
    const searchString = useSelector((store) => store.search);
    const token = useSelector((store) => store.user.token);
    const sort = useSelector((store) => store.sort);

    const navigate = useNavigate();

    const {data, error, isLoading, isSuccess, isError} = useQuery({ 
        queryKey: [GET_PRODUCTS_QUERY_KEY, searchString, token], 
        queryFn: getProductsByWord,
    }); 
    function prepareToSignIn(){
        navigate("/sign");
    }

    if(isLoading) return <Loader />
    if(isError) return (
        <div>
            <p>{`${error}`}</p>
            <UsualButton text = {"Sing In"} do = {prepareToSignIn} />
        </div>
        );
    if(isSuccess) {
        const preparedData = sortData(data,sort)
        if(data.length === 0) return (
            <div className={styles.notFound}>
                <NotFoundPic />
                <p>The product did not found...</p>
            </div>
        )
        else return (
        <div className={styles.container}>
            <FilterBar />
            <main className={styles.mainContainer}>
                {preparedData}
                </main>
        </div>
        );
    }
}
export {
    Main,
}