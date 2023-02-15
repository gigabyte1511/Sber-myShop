import styles from './styles.module.css';

export function Comment({params}){
    const date = new Date(params.created_at)
    return(
        <div className={styles.container}>
            <img className={styles.imageContainer} src={params.author.avatar} alt = "123"></img>
            <div className={styles.infoContainer}>
                <p style={{fontSize: 14}}>{params.author.name}</p>
                <p>Rate: {params.rating}</p>
            </div>
            <div className={styles.textContainer}>
                <p>{params.text.slice(0,60)}</p>
                <p className = {styles.date}>{`${date}`}</p>
            </div>
        </div>
    );
}