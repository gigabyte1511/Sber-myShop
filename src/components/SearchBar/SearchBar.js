import { useState } from "react";
import { useDispatch, useSelector} from "react-redux";
import { setSearch } from "../../redux/slices/searchSlices";
import { useDebounce } from "../CustomHooks/useDebounce";
import styles from "./styles.module.css"
function SearchBar(){
    const dispatch = useDispatch();
    const searchString = useSelector((store) => store.search);
    const [input, setInput] = useState(searchString);
    //Кастомный хук оптимизации debounce
    const debounceValue = useDebounce(input, 500);
    dispatch(setSearch(debounceValue));


    return(
        <input 
            type="textfield" 
            className={styles.input} 
            onChange = {(e)=> setInput(e.target.value)} 
            placeholder = "Search..."
            value={input}>
        </input>
    )
}
export {
    SearchBar,
}