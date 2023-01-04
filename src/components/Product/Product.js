import { useDispatch, useSelector } from 'react-redux';
import { addToCartAC, deleteFromCartAC } from '../../redux/actionCreators/cartAC';
import { UsualButton } from '../Buttons/UsualButton/UsualButton';
import styles from './styles.module.css'
function Product({params}){
    const dispatch = useDispatch();
    const cart = useSelector((store) => store.cart);

    let $price = <p className>{params.price}</p>;
    let $discountPrice;

    const addToCart = () => {
        dispatch(addToCartAC({id: params._id, count: 1,}));
    }

    const deleteFromCart = () => {
        dispatch(deleteFromCartAC({id: params._id}));
    }

    let $button = <UsualButton do = { addToCart }  text="Add to Cart" />;
    const idsInCart = cart.map((product) => product.id);

    if(idsInCart.includes(params._id)){
        console.log("Included");
        $button = <UsualButton do = { deleteFromCart } style = {{backgroundColor: 'red'}} text="Remove from Cart" />

    }

    //Расчет цены с учетом скидки
    if (params.discount !== 0){
        $discountPrice = <p className = {styles.discountPrice}>{params.price - params.price * (params.discount / 100)}</p>;
        $price = <p className = {styles.deletePrice}>{params.price}</p>;
    }
    return (
    <div className={styles.container}>
            <img src={params.pictures} className={styles.imageContainer} alt = "123"></img>
        <div className={styles.ParametersField}>
            {$price}
            {$discountPrice}
            <p>{params.name}</p>
        </div>
        <div className={styles.buttonContainer}>
            {$button}
        </div>
    </div>
    )
}
export {
    Product,
}