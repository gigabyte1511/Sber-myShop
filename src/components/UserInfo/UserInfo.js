import { useQuery } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUserInfo } from '../../API/query';

import { removeToken, removeUserGroup } from '../../redux/slices/userSlices';

import { UsualButton } from '../Buttons/UsualButton/UsualButton'
import Loader from '../Loader/Loader';
import styles from './styles.module.css'

const USERINFO_QUERY_KEY = "USERINFO_QUERY_KEY";

function UserInfo(){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {group, token} = useSelector((store) => store.user);

    //Функция выполнения выхода пользователя, удаление токена
    const SingOut = () =>{
        dispatch(removeToken());
        dispatch(removeUserGroup());
        navigate("/sign");
    }

    const {data, error, isLoading, isSuccess, isError} = useQuery({ 
        queryKey: [USERINFO_QUERY_KEY, group, token], 
        queryFn: getUserInfo
    }); 

    function prepareToSignIn(){
        navigate("/sign");
    }

    if(isLoading) return <Loader />
    if(isError) return (
        <>
            <p>{`${error}`}</p>
            <UsualButton text = {"Sing In"} do = {prepareToSignIn} />
        </>
    )
    if(isSuccess) {
        return (
            <div className={styles.container}>
            <div className={styles.userIfo}>
                <div className={styles.avatarContainer}>
                    <img src={data.avatar} className={styles.avatar} alt='123'></img>
                    <UsualButton text = "Sing Out" do = {()=>{SingOut()}} />
                </div>
                <div className={styles.infoContainer}>
                    <p>Name: {data.name}</p>
                    <p>About: {data.about}</p>
                    <p>ID: {data._id}</p>
                    <p>EMail: {data.email}</p>
                    <p>Group: {data.group}</p>
                </div>
            </div>
            <UsualButton text = "Close" do = {()=>{navigate("/main")}}/>
        </div>
        );
    }

}
export {
    UserInfo,
}