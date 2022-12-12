import { Logo } from '../Logo/Logo'
import { FooterNavigation } from './FooterNavigation/FooterNavigation'
import styles from './styles.module.css'
function Footer(){
    return (
        <div className={styles.container}>
            <Logo />
            <FooterNavigation />
            <FooterNavigation />
        </div>
    )
}
export {
    Footer,
}