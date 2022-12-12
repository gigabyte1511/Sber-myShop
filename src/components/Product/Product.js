import { UsualButton } from '../Buttons/UsualButton/UsualButton';
import styles from './styles.module.css'
function Product({params}){
    // console.log(params.params.name);
    let $price = <p className>{params.price}</p>;
    let $discountPrice;
    //Расчет цены с учетом скидки
    if (params.discount !== 0){
        $discountPrice = <p className = {styles.discountPrice}>{params.price - params.price * (params.discount / 100)}</p>;
        $price = <p className = {styles.deletePrice}>{params.price}</p>;
    }
    return (
    <div className={styles.container}>
            <img src={params.pictures} className={styles.imageContainer} alt = "123"></img>
        <div className={styles.ParametersField}>
            {$price}
            {$discountPrice}
            <p>{params.name}</p>
        </div>
        <div className={styles.buttonContainer}>
        <UsualButton text="Add to Cart" />
        </div>
    </div>
    )
}
export {
    Product,
}