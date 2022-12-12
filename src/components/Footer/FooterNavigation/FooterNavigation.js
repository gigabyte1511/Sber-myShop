import styles from './styles.module.css';
function FooterNavigation(){
    return(
        <div className={styles.container}>
            <p>Catalog</p>
            <p>Promotions</p>
            <p>News</p>
            <p>Recall</p>
        </div>
    )
}
export {
    FooterNavigation,
}