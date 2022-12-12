import { useEffect, useState } from "react"
import Api from "../../API/serverApi";
import { Product } from "../Product/Product"
import styles from "./styles.module.css"

//import styles from './styles.module.css'
function Main(){
    const [data, setData] = useState([]);
    
    useEffect(()=>{
        //Получение товаров с сервера
        const api = new Api();
        api.getProducts().then((response)=>{
            setData(response.products);
        });
    }, []);
    if (data !== undefined){
        const jsx = [];
        for (let elem of data){
            jsx.push(<Product params = {elem} />)
        }
        return (
            <main>
                {jsx}
            </main>
        );
    } else return (
        <main>
            <p>No data</p>
        </main>)
}
export {
    Main,
}