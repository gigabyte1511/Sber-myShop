import { useQuery } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUserInfo } from '../../API/query';

import { removeToken, removeUserGroup, removeUserID } from '../../redux/slices/userSlices';

import { UsualButton } from '../Buttons/UsualButton/UsualButton'
import Loader from '../Loader/Loader';
import styles from './styles.module.css'
import { Outlet } from "react-router-dom";
import { DoubleSelector } from '../Buttons/DoubleSelector/DoubleSelector';

export const GET_USERINFO_QUERY_KEY = "USERINFO_QUERY_KEY";

function UserInfo(){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {group, token} = useSelector((store) => store.user);

    //Функция выполнения выхода пользователя, удаление токена
    const SingOut = () =>{
        dispatch(removeToken());
        dispatch(removeUserGroup());
        dispatch(removeUserID());
        localStorage.removeItem("set");
        navigate("/sign");
    }

    const {data, error, isLoading, isSuccess, isError} = useQuery({ 
        queryKey: [GET_USERINFO_QUERY_KEY, group, token], 
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
            <>
            <div className={styles.container}>
            <div className={styles.userIfo}>
                <div className={styles.avatarContainer}>
                        <img src={data.avatar} className={styles.avatar} alt='123'></img>
                        <UsualButton text="Edit picture" do = {()=> navigate("editPicture", {state: data})} /> 
                </div>
                <div className={styles.infoContainer}>
                    <p>Name: {data.name}</p>
                    <p>About: {data.about}</p>
                    <p>ID: {data._id}</p>
                    <p>EMail: {data.email}</p>
                    <p>Group: {data.group}</p>
                    <UsualButton text="Edit" do = {()=> navigate("editInfo", {state: data})} /> 
                </div>
            </div>
            <div className={styles.buttonContainer}>
                <DoubleSelector className = {styles.selectorContainer} 
                    text = {{left:"Sing Out", right:"Close"}} 
                    do = {{left:()=> SingOut(), right: ()=> navigate("/main")}}
                />
            </div>
        </div>
        <Outlet />
        </>
        );
    }

}
export {
    UserInfo,
}