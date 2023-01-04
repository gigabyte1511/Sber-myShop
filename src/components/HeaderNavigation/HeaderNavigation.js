import favourite from "./img/favourite.svg"
import cart from "./img/cart.svg" 
import person from "./img/person.svg"
import styles from "./styles.module.css"
import { useNavigate } from "react-router-dom";
function HeaderNavigation(){
    const navigate = useNavigate();
    //Проверка на наличие токена:
    //  Есть - выполнение отображения компонента с товарами
    const goPerson = () =>{
        if (localStorage.getItem("token")){
            navigate("/userInfo")
        }
    }
    const goCart= () =>{
        if (localStorage.getItem("token")){
            navigate("/cart")
        }
    }

 return(
    <div className={styles.imgContainer}>
        <img className={styles.img} src={favourite} alt = ""></img>
        <img className={styles.img} src={cart} alt = "" onClick={()=>{goCart()}}></img>
        <img className={styles.img} src={person} alt = "" onClick={()=>{goPerson()}}></img>
    </div>
 )
}
export {
    HeaderNavigation,
}