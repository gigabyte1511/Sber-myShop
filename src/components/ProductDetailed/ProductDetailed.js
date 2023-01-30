import { useQuery } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { getProductById } from '../../API/query';
import { cartAdd, cartDelete } from '../../redux/slices/cartSlices';
import Loader from '../Loader/Loader';
import styles from './styles.module.css';
import { toast } from 'react-toastify';
import { favouriteAdd, favouriteDelete } from '../../redux/slices/favouriteSlices';
import { UsualButton } from '../Buttons/UsualButton/UsualButton';
import { CommentContainer } from './CommentContainer/CommentContainer';
export const GET_PRODUCTBYID_QUERY_KEY = "GET_PRODUCTBYID_QUERY_KEY";

export function ProductDetailed(){

    const location = useLocation();
    const productID = location.pathname.split("/")[2]

    const navigate = useNavigate();
    const {token, id:userID} = useSelector((store) => store.user);
    const cart = useSelector((store) => store.cart);
    const favourites = useSelector((store) => store.favourite);
    const dispatch = useDispatch();

    const {data:dataProduct, error:errorProduct, isLoading:isLoadingProduct, isSuccess:isSuccessProduct, isError:isErrorProduct} = useQuery({ 
        queryKey: [GET_PRODUCTBYID_QUERY_KEY, token, productID], 
        queryFn: getProductById
    }); 

    if(isLoadingProduct) return <Loader/>
    if(isErrorProduct) console.log(errorProduct)
    
    if(isSuccessProduct) {
        const addToCart = () => {
            dispatch(cartAdd({id: productID, count: 1, price: dataProduct, actualPrice, isSelected: true, stock: dataProduct.stock}));
            toast(`Product "${dataProduct.name.slice(0,20)}..." has been add to the cart.`, { type: "success", icon: "🛒" });
        }
        const deleteFromCart = () => {
            dispatch(cartDelete({id: dataProduct._id}));
            toast(`Product "${dataProduct.name.slice(0,20)}..." has been removed from cart.`, { type: "error", icon: "🛒" });
        }
        const addToFavourite = () => {
            dispatch(favouriteAdd(dataProduct._id))
            toast(`Product "${dataProduct.name.slice(0,20)}..." has been add to the favourite.`, { type: "success", icon: "❤️" });
    
        }
        const deleteFromFavourite = () => {
            dispatch(favouriteDelete(dataProduct._id));
            toast(`Product "${dataProduct.name.slice(0,20)}..." has been removed from favorite.`, { type: "error", icon: "❤️" });
    
        }
        const editProduct = () => {
            navigate(`/edit`, { state: dataProduct});
        }

    let $cartButton = <UsualButton do = { addToCart }  text="Add to Cart" />;
    const idsInCart = cart.map((product) => product.id);
    if(idsInCart.includes(dataProduct._id)){
        $cartButton = <UsualButton do = { deleteFromCart } text="Remove from Cart" />
    }
    let $favouriteButton = <UsualButton do = { addToFavourite }  text="Add to favourite" />;
    if(favourites.includes(productID)){
        $favouriteButton = <UsualButton do = { deleteFromFavourite }  text="Remove from favourite" />;
    }
    const $editButton = <UsualButton do = { editProduct }  text="Edit product" />

    let $priceBlock = dataProduct.price;
    const actualPrice = dataProduct.price - (dataProduct.discount * dataProduct.price / 100)
    if(dataProduct.discount){
        $priceBlock = [
            <div className={styles.priceContainer}>
                <p style={{
                    opacity: 0.6,
                    textDecoration: "line-through"
                }}>
                    {dataProduct.price}
                </p>
                <p style={{
                    color: "red",
                }}>
                    -{dataProduct.discount}%</p>
            </div>,
            <p style={{
                fontWeight: "bold",
            }}> 
                {actualPrice}
            </p>
        ]
    }
        return (
        <>
        <div className={styles.container}>
            <h1 className={styles.headerContainer}>{dataProduct.name}</h1>
            <div className={styles.infoContainer}>
                <img className = {styles.image} src={dataProduct.pictures} alt = "123"></img>
                <div className={styles.rightBlock}>
                    {$priceBlock}
                    <p>Available: {dataProduct.stock}pc.</p>
                    <p>Wight: {dataProduct.wight}</p>
                    <p>Likes: {dataProduct.likes.length}</p>
                    <p>Created at: {dataProduct.created_at}</p>
                    <p>Last update: {dataProduct.updated_at}</p>
                    <p>Description: {dataProduct.description}</p>
                    <div className={styles.buttonContainer}>
                        {dataProduct.author._id === userID ? 
                            [$cartButton, $favouriteButton, $editButton] :
                            [$cartButton, $favouriteButton] }
                    </div>
                </div>
            </div>
            <div className={styles.autorAboutContainer}>
                <h1>Autor info</h1>
                <p>Autor about: {dataProduct.author.about}</p>
                <p>Autor email: {dataProduct.author.email}</p>
                <p>Autor name: {dataProduct.author.name}</p>
                <p>Autor group: {dataProduct.author.group}</p>
            </div>
            <div className={styles.commentsContainer}>
                <CommentContainer productID = {productID}/>
                <Outlet />
            </div>
        </div>
    </>
    )}
}