import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { getCommentsByProductID } from '../../../API/query';
import { Accordion } from '../../Accordion/Accordion';
import Loader from '../../Loader/Loader';
import { Comment } from './Comment/Comment';


export const GET_COMMENTS_QUERY_KEY = "GET_COMMENTS_QUERY_KEY";

export function CommentContainer({productID}){
    const {token, } = useSelector((store) => store.user);

    const {data, error, isLoading, isSuccess, isError} = useQuery({ 
        queryKey: [GET_COMMENTS_QUERY_KEY, productID, token], 
        queryFn: getCommentsByProductID
    }); 

    if(isLoading) return <Loader/>
    if(isError) return`Error: ${error}`;
    if(isSuccess) {
        let $comments;
        $comments = data.map((elem)=> <Comment params={elem} />);
        return <Accordion params = {{name: "Comments", strings: $comments}}/>
    }


}