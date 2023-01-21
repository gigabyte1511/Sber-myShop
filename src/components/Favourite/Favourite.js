import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { getProductsByIds } from '../../API/query';
import { GET_PRODUCTS_BY_ID_QUERY_KEY } from '../Cart/Cart';
import Loader from '../Loader/Loader';
import { PlaceHolder } from '../PlaceHolder/PlaceHolder';
import { ProductInFavourite } from './ProductInFavourite/ProductInFavourite';
import styles from './styles.module.css';
import heartImg from "./img/broken-heart.svg"

export function Favourite(){
    const favoutite = useSelector((store) => store.favourite);
    const token = useSelector((store) => store.user.token);

    const {data, error, isLoading, isSuccess, isError, } = useQuery({ 
        queryKey: [GET_PRODUCTS_BY_ID_QUERY_KEY, favoutite, token], 
        queryFn: getProductsByIds
    }); 

    if(isLoading) return <Loader />
    if(isError) return <p>{`${error}`}</p>
    if(isSuccess) {
        const $productsInFavouriteJSX = data.map((elem) => <ProductInFavourite params = {elem}/>)
        if(data.length === 0) return <PlaceHolder text = "Favourite is empty" image = {heartImg}/>

        return (
            <div className={styles.container}>
                {$productsInFavouriteJSX}
            </div>
        )
    }
}