import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { HeaderNavigation } from "../HeaderNavigation/HeaderNavigation"
import { Logo } from "../Logo/Logo"
import { SearchBar } from "../SearchBar/SearchBar"
import styles from "./styles.module.css"

function Header (){
    const navigate = useNavigate();
    const token = useSelector((store) => store.user.token);

    
    // Проверка на наличие токена и выполнение отображения компонента с товарами
    const isToken = () =>{
        if (token){
            navigate("/main")
        }
    }

    return(
        <header>
            <div style= {{cursor:"pointer"}} onClick={()=>{isToken()}}>
                <Logo />
                <h3 className={styles.label}>ONLINE PET FOOD STORE</h3>
            </div>
            <SearchBar />
            <HeaderNavigation />
        </header>
    )
}
export {
    Header,
}