// import "./Loader.css"
import styles from "./styles.module.css"
export default function Loader(){
    return (
        <div className= {styles.lds_roller} ><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    )
}