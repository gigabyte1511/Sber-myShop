import { useDispatch, useSelector } from 'react-redux';
import { addToCartAC, deleteFromCartAC } from '../../redux/actionCreators/cartAC';
import { UsualButton } from '../Buttons/UsualButton/UsualButton';
import styles from './styles.module.css'
function Product({params}){
    const dispatch = useDispatch();
    const cart = useSelector((store) => store.cart);

    let $price = <p className>{params.price}</p>;
    let $discountPrice;
    const actualPrice = params.price - params.price * (params.discount / 100)

        //Расчет цены с учетом скидки
    if (params.discount !== 0){
        $discountPrice = <p className = {styles.discountPrice}>{params.price - params.price * (params.discount / 100)}</p>;
        $price = <p className = {styles.deletePrice}>{params.price}</p>;
    }

    const addToCart = () => {
        dispatch(addToCartAC({id: params._id, count: 1, price: params.price, actualPrice, stock: params.stock}));
    }

    const deleteFromCart = () => {
        dispatch(deleteFromCartAC({id: params._id}));
    }

    let $cartButton = <UsualButton do = { addToCart }  text="Add to Cart" />;
    const idsInCart = cart.map((product) => product.id);

    if(idsInCart.includes(params._id)){
        // style = {{backgroundColor: 'red'}} 
        $cartButton = <UsualButton do = { deleteFromCart } text="Remove from Cart" />

    }

    return (
    <div className={styles.container}>
        <img src={params.pictures} className={styles.imageContainer} alt = "123"></img>
        <div>
            <div className={styles.priceField}>
                {$price}
                {$discountPrice}
            </div>
            <p>{params.name}</p>
            <p>Available: {params.stock} pс.</p>
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