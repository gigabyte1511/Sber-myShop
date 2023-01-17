import { useQuery } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUserInfo } from '../../API/query';
import { removeTokenAC, removeUserGroupAC } from '../../redux/actionCreators/userAC';
import { UsualButton } from '../Buttons/UsualButton/UsualButton'
import Loader from '../Loader/Loader';
import styles from './styles.module.css'

const USERINFO_QUERY_KEY = "USERINFO_QUERY_KEY";

function UserInfo(){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((store) => store.user);

    //Функция выполнения выхода ползователя, удаление токена
    const SingOut = () =>{
        localStorage.removeItem("token");
        localStorage.removeItem("group");
        dispatch(removeTokenAC());
        dispatch(removeUserGroupAC());
        navigate("/sign");
    }

    const {data, error, isLoading, isSuccess, isError} = useQuery({ 
        queryKey: [USERINFO_QUERY_KEY, user.group], 
        queryFn: getUserInfo
    }); 

    function prepareToSignIn(){
        localStorage.removeItem("group");
        localStorage.removeItem("token");
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