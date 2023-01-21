import { useDispatch, useSelector } from 'react-redux';
import { cartAdd, cartDelete } from '../../../redux/slices/cartSlices';
import { favouriteDelete } from '../../../redux/slices/favouriteSlices';
import { DoubleSelector } from '../../Buttons/DoubleSelector/DoubleSelector';
import styles from './styles.module.css';

export function ProductInFavourite({params}){
    const cart = useSelector((store) => store.cart);
    const dispatch = useDispatch();


    let $priceBlock = params.price;
    const actualPrice = params.price - (params.discount * params.price / 100)
    if(params.discount){
        $priceBlock = [
            <div className={styles.priceContainer}>
                <p style={{
                    opacity: 0.6,
                    textDecoration: "line-through"
                }}>
                    {params.price}
                </p>
                <p style={{
                    color: "red",
                }}>
                    -{params.discount}%</p>
            </div>,
            <p style={{
                fontWeight: "bold",
            }}> 
                {actualPrice}
            </p>
        ]
    }
    const removeFromFavourite = () => dispatch(favouriteDelete(params._id));
    const addToCart = () => {
        dispatch(cartAdd({id: params._id, count: 1, price: params.price, actualPrice, isSelected: true, stock: params.stock}));
    }
    const deleteFromCart = () => {
        dispatch(cartDelete({id: params._id}));
    }

    let $doubleSelector = 
        <DoubleSelector
            text = {{left:"Remove", right:"Add in cart"}} 
            do = {{left: removeFromFavourite, right: addToCart}} 
            />;
    const idsInCart = cart.map((product) => product.id);
    if(idsInCart.includes(params._id)){
        $doubleSelector = 
            <DoubleSelector
                text = {{left:"Remove", right:"Del from cart"}} 
                do = {{left: removeFromFavourite, right: deleteFromCart}} 
            />;
    }
    return (
        <div className={styles.container}>
            <div className={styles.productContainer}>
                <div className={styles.imageContainer}>
                    <img src={params.pictures} alt = "123" style = {{height: "100px", width: "100px" }}></img>
                </div>
                <div className={styles.infoContainer}>
                    <h1>{params.name}</h1>
                    <p>Likes: {params.likes.length}</p>
                    {$priceBlock}
                </div>
            </div>
            {$doubleSelector}
        </div>

    )
}