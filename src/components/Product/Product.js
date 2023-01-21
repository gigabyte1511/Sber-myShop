import { useDispatch, useSelector } from 'react-redux';
import { cartAdd, cartDelete } from '../../redux/slices/cartSlices';
import { UsualButton } from '../Buttons/UsualButton/UsualButton';
import styles from './styles.module.css';
// import favouriteIcon from './img/favourite.svg';
import {ReactComponent as FavouriteIcon} from './img/favourite.svg';
import { favouriteAdd, favouriteDelete } from '../../redux/slices/favouriteSlices';

function Product({params}){
    const dispatch = useDispatch();
    const cart = useSelector((store) => store.cart);
    const favourites = useSelector((store) => store.favourite);

    let $price = <p className>{params.price}</p>;
    let $discountPrice;
    const actualPrice = params.price - params.price * (params.discount / 100)

        //Расчет цены с учетом скидки
    if (params.discount !== 0){
        $discountPrice = <p className = {styles.discountPrice}>{params.price - params.price * (params.discount / 100)}</p>;
        $price = <p className = {styles.deletePrice}>{params.price}</p>;
    }

    const addToCart = () => {
        dispatch(cartAdd({id: params._id, count: 1, price: params.price, actualPrice, isSelected: true, stock: params.stock}));
    }

    const deleteFromCart = () => {
        dispatch(cartDelete({id: params._id}));
    }
    const addToFavourite = () => {
        dispatch(favouriteAdd(params._id))
    }
    const deleteFromFavourite = () => {
        dispatch(favouriteDelete(params._id));
    }

    let $cartButton = <UsualButton do = { addToCart }  text="Add to Cart" />;
    const idsInCart = cart.map((product) => product.id);
    if(idsInCart.includes(params._id)){
        $cartButton = <UsualButton do = { deleteFromCart } text="Remove from Cart" />
    }

    let $favouriteButton = <FavouriteIcon className={styles.favoutiteIcon} onClick={addToFavourite}/>;
    if(favourites.includes(params._id)){
        $favouriteButton = <FavouriteIcon style={{fill:"red"}} className={styles.favoutiteIcon} onClick={deleteFromFavourite}/>;
    }

    // const doFavourite = (event) =>{
    //     if(!favourite.includes(params._id)){

    //     }
    //     console.log(event.target);
    //     console.log(event.target.getAttribute("fill"));
    //     event.target.setAttribute("fill", "red")
    //     console.log(params._id)
    //     //event.target.style.fill = "red";
    // }
    return (
    <div className={styles.container}>
        {/* <FavouriteIcon className={styles.favoutiteIcon} onClick={doFavourite}/> */}
        {$favouriteButton}
        <img src={params.pictures} className={styles.imageContainer} alt = "123"></img>
        <hr className={styles.hr}></hr>
        <div>
            <div className={styles.priceField}>
                {$price}
                {$discountPrice}
            </div>
            <p>{params.name}</p>
            <p className = {styles.available} >Available: {params.stock} pс.</p>
        </div>
        
        <div className={styles.buttonContainer}>
            {$cartButton}
        </div>
    </div>
    )
}
export {
    Product,
}