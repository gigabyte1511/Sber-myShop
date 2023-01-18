import styles from './styles.module.css';

export function ProductInFavourite(){
    return (
        <>
            <div className={styles.imageContainer}>
                <img></img>
            </div>
            <div className={styles.infoContainer}>
                <p>Name</p>
                <p>Stars</p>
                <p>Price</p>
                
            </div>
        </>
    )
}