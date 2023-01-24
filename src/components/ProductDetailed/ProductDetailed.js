import { useQuery } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { getCommentsByProductID } from '../../API/query';
import { cartAdd, cartDelete } from '../../redux/slices/cartSlices';
import { Accordion } from '../Accordion/Accordion';
import Loader from '../Loader/Loader';
import { Comment } from './Comment/Comment';
import styles from './styles.module.css';

import { toast } from 'react-toastify';
import { favouriteAdd, favouriteDelete } from '../../redux/slices/favouriteSlices';
import { UsualButton } from '../Buttons/UsualButton/UsualButton';


export const GET_COMMENTS_QUERY_KEY = "GET_COMMENTS_QUERY_KEY";

export function ProductDetailed(){
    const {state:params} = useLocation();
    console.log(params);
    const token = useSelector((store) => store.user.token);
    const cart = useSelector((store) => store.cart);
    const favourites = useSelector((store) => store.favourite);
    const dispatch = useDispatch();


    const {data, error, isLoading, isSuccess, isError} = useQuery({ 
        queryKey: [GET_COMMENTS_QUERY_KEY, params._id, token], 
        queryFn: getCommentsByProductID
    }); 

    const addToCart = () => {
        dispatch(cartAdd({id: params._id, count: 1, price: params.price, actualPrice, isSelected: true, stock: params.stock}));
        toast(`Product "${params.name.slice(0,20)}..." has been add to the cart.`, { type: "success", icon: "🛒" });
    }
    const deleteFromCart = () => {
        dispatch(cartDelete({id: params._id}));
        toast(`Product "${params.name.slice(0,20)}..." has been removed from cart.`, { type: "error", icon: "🛒" });
    }
    const addToFavourite = () => {
        dispatch(favouriteAdd(params._id))
        toast(`Product "${params.name.slice(0,20)}..." has been add to the favourite.`, { type: "success", icon: "❤️" });

    }
    const deleteFromFavourite = () => {
        dispatch(favouriteDelete(params._id));
        toast(`Product "${params.name.slice(0,20)}..." has been removed from favorite.`, { type: "error", icon: "❤️" });

    }

    let $cartButton = <UsualButton do = { addToCart }  text="Add to Cart" />;
    const idsInCart = cart.map((product) => product.id);
    if(idsInCart.includes(params._id)){
        $cartButton = <UsualButton do = { deleteFromCart } text="Remove from Cart" />
    }

    let $favouriteButton = <UsualButton do = { addToFavourite }  text="Add to favourite" />;
    if(favourites.includes(params._id)){
        $favouriteButton = <UsualButton do = { deleteFromFavourite }  text="Remove from favourite" />;
    }

    let $comments;
    if(isLoading) $comments = <Loader/>
    if(isError) $comments = `Error: ${error}`;
    if(isSuccess) {
        $comments = data.map((elem)=> <Comment params={elem} />);
        console.log(data);
    }

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

    return (
        <div className={styles.container}>
            <h1 className={styles.headerContainer}>{params.name}</h1>
            <div className={styles.infoContainer}>
                <img className = {styles.image} src={params.pictures} alt = "123"></img>
                <div className={styles.rightBlock}>
                    {$priceBlock}
                    <p>Wight: {params.wight}</p>
                    <p>Available: {params.stock}pc.</p>
                    <p>Likes: {params.likes.length}</p>
                    <p>Created at: {params.created_at}</p>
                    <p>Last update: {params.updated_at}</p>
                    <p>Description: {params.description}</p>
                    <div className={styles.buttonContainer}>
                        {$cartButton}
                        {$favouriteButton}
                    </div>
                </div>
            </div>
            <div className={styles.autorAboutContainer}>
                <h1>Autor info</h1>
                <p>Autor about: {params.author.about}</p>
                <p>Autor email: {params.author.email}</p>
                <p>Autor name: {params.author.name}</p>
                <p>Autor group: {params.author.group}</p>
            </div>
            <div className={styles.commentsContainer}>
                <Accordion params = {{name: "Comments", strings: $comments}}/>
            </div>
        </div>
    )
}