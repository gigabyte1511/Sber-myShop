import { useDispatch, useSelector } from 'react-redux';
import { favouriteDelete } from '../../../redux/slices/favouriteSlices';
import { UsualButton } from '../../Buttons/UsualButton/UsualButton';
import styles from './styles.module.css';

export function ProductInFavourite({params}){
    const favourite = useSelector((store) => store.favourite);
    const dispatch = useDispatch();

    // const cart = useSelector((store) => store.cart);

    let $priceBlock = params.price;
    if(params.discount){
        const actualPrice = params.price - (params.discount * params.price / 100)
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
    // const addToCart = () =>{}
    const removeFromFavourite = () => dispatch(favouriteDelete(params._id))

    return (
        <div className={styles.container}>
            <div className={styles.imageContainer}>
                <img src={params.pictures} alt = "123" style = {{height: "100px", width: "100px" }}></img>
            </div>
            <div className={styles.infoContainer}>
                <h1>{params.name}</h1>
                <p>Likes: {params.likes.length}</p>
                {$priceBlock}
                <UsualButton text = {"Remove"} do = {removeFromFavourite} />
            </div>
            {/* <div className={styles.buttonContainer}>
                <UsualButton text = {"Add to cart"} do = {addToCart} />
                <UsualButton text = {"Remove from favourite"} do = {removeFromFavourite} />
            </div> */}

        </div>

    )
}