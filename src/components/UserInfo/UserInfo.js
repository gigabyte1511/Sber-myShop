import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Api from '../../API/serverApi';
import { UsualButton } from '../Buttons/UsualButton/UsualButton'
import styles from './styles.module.css'

function UserInfo(){
    const navigate = useNavigate();
    const [userData, setUserData] = useState("");
    //Функция выполнения выхода ползователя, удаление токена
    const SingOut = () =>{
        localStorage.removeItem("token");
        navigate("/sign");
    }
    useEffect(() => {
        //Попытка получить данные о пользователе с сервера
        const api = new Api();
        api.getUserInfo().then((response)=>{
            setUserData(response);
        });
    });
    return(
        <div className={styles.container}>
            <div className={styles.userIfo}>
                <div className={styles.avatarContainer}>
                    <img src={userData.avatar} className={styles.avatar} alt='123'></img>
                    <UsualButton text = "Sing Out" do = {()=>{SingOut()}} />
                </div>
                <div className={styles.infoContainer}>
                    <p>Name: {userData.name}</p>
                    <p>About: {userData.about}</p>
                    <p>ID: {userData._id}</p>
                    <p>EMail: {userData.email}</p>
                    <p>Group: {userData.group}</p>
                </div>
            </div>
            <UsualButton text = "Close" do = {()=>{navigate("/main")}}/>
        </div>
    )
}
export {
    UserInfo,
}