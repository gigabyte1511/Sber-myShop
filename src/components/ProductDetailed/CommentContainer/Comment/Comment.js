import styles from './styles.module.css';

export function Comment({params}){
    return(
        <div className={styles.container}>
            <img className={styles.imageContainer} src={params.author.avatar} alt = "123"></img>
            <div className={styles.infoContainer}>
                <p style={{fontSize: 14}}>{params.author.name}</p>
                <p>Rate: {params.rating}</p>
                {/* <p className = {styles.date}>{params.created_at}</p> */}
            </div>
            <div className={styles.textContainer}>
                <p>{params.text}</p>
                <p className = {styles.date}>{params.created_at}</p>
            </div>
        </div>
    );
}