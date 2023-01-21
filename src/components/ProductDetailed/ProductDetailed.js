import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { getCommentsByProductID } from '../../API/query';
import Loader from '../Loader/Loader';
import { Comment } from './Comment/Comment';
import styles from './styles.module.css';

export const GET_COMMENTS_QUERY_KEY = "GET_COMMENTS_QUERY_KEY";

export function ProductDetailed(){
    const {state:params} = useLocation();
    console.log(params);
    const token = useSelector((store) => store.user.token);

    const {data, error, isLoading, isSuccess, isError} = useQuery({ 
        queryKey: [GET_COMMENTS_QUERY_KEY, params._id, token], 
        queryFn: getCommentsByProductID
    }); 
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
                <h1>Comments</h1>
                {$comments}
            </div>
        </div>
    )
}