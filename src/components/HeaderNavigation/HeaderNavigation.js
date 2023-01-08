import favouritePic from "./img/favourite.svg"
import cartPic from "./img/cart.svg" 
import personPic from "./img/person.svg"
import styles from "./styles.module.css"
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
function HeaderNavigation(){
    const navigate = useNavigate();
    const cart = useSelector((store) => store.cart);
    let $counter = <div className={styles.counter}>{cart.length}</div>
    if (cart.length === 0) $counter = '';
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
        <img className={styles.img} src={favouritePic} alt = ""></img>
        <div className={styles.cardContainer}>
            <img className={styles.img} src={cartPic} alt = "" onClick={()=>{goCart()}}></img>
            {$counter}
        </div>
        <img className={styles.img} src={personPic} alt = "" onClick={()=>{goPerson()}}></img>
    </div>
 )
}
export {
    HeaderNavigation,
}