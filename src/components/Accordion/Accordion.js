import { useState } from 'react';
import styles from './styles.module.css';
import {ReactComponent as ArrowImg} from './img/arrow.svg';

export function Accordion({params}){
    const [isSelected, setIsSelected] = useState(false);
    let $content = params.strings;
    // let $button = <img className={styles.arrowDown} src={arrowImg} onClick={()=> setIsSelected(!isSelected)}></img>
    let $button = <ArrowImg 
            className={styles.arrowUp} 
            onClick={()=> setIsSelected(!isSelected)}
        />


    if(!isSelected) {
        $content = params.strings[0];
        $button = <ArrowImg 
            className={styles.arrowDown} 
            onClick={()=> setIsSelected(!isSelected)}
        />
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>{params.name}</h1>
                {$button}
            </div>
            <div className={styles.body}>
                {$content}
            </div>
        </div>
    )
}