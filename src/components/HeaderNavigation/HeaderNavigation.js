import favourite from "./img/favourite.svg"
import basket from "./img/basket.svg" 
import person from "./img/person.svg"
import styles from "./styles.module.css"
import { useNavigate } from "react-router-dom";
function HeaderNavigation(){
    const navigate = useNavigate();
    //Проверка на наличие токена:
    //  Есть - выполнение отображения компонента с товарами
    const isToken = () =>{
        if (localStorage.getItem("token")){
            navigate("/userInfo")
        }
    }

 return(
    <div className={styles.imgContainer}>
        <img className={styles.img} src={favourite} alt = ""></img>
        <img className={styles.img} src={basket} alt = ""></img>
        <img className={styles.img} src={person} alt = "" onClick={()=>{isToken()}}></img>
    </div>
 )
}
export {
    HeaderNavigation,
}