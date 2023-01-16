import styles from './styles.module.css'

export function PlaceHolder(params) {
 return(
    //Create a placeholder jsx
     <div className={styles.container}>
        <p>{params.text}</p>
        <img src={params.image} alt={123}></img>
    </div>
 )
}