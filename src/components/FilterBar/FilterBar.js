import { useDispatch} from 'react-redux'
import { setSort } from '../../redux/slices/sortSlices'
import { Link } from './Link/Link'
import styles from './styles.module.css'

export function FilterBar(){
    const dispatch = useDispatch()

    function disableFilter(){
        dispatch(setSort("Disable"))
    }
    function firstExpensiveFilter(){
        dispatch(setSort("First expensive"))
    }
    function firstCheapFilter(){
        dispatch(setSort("First cheap"))
    }
    function firstNewFilter(){
        dispatch(setSort("First new"))
    }

    return (
        <div className={styles.container}>
            <Link name = {"Disable"} do = {disableFilter} />
            <Link name = {"First expensive"} do = {firstExpensiveFilter} />
            <Link name = {"First cheap"} do = {firstCheapFilter}  />
            <Link name = {"First new"} do = {firstNewFilter}  />
        </div>
    )
}
