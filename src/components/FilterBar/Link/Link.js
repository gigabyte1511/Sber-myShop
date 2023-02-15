import { useSelector } from 'react-redux'
import styles from './styles.module.css'
export function Link (params) {
    const sort = useSelector((store) => store.sort)
    return(
        <div className={styles.container}>
            <p onClick = {params.do} style={(sort === params.name)?{color:"red"}:{color:"black"}}>{params.name} </p>
        </div>

    )
}