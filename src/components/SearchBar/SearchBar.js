import { useState } from "react";
import { useDispatch} from "react-redux";
import { setSearch } from "../../redux/slices/searchSlices";
import { useDebounce } from "../CustomHooks/useDebounce";
import styles from "./styles.module.css"
function SearchBar(){
    const dispatch = useDispatch();
    const [input, setInput] = useState("");
    //Кастомный хук оптимизации debounce
    const debounceValue = useDebounce(input, 500);
    dispatch(setSearch(debounceValue));


    return(
        <input 
            type="textfield" 
            className={styles.input} 
            onChange = {(e)=> setInput(e.target.value)} 
            placeholder = "Search...">
        </input>
    )
}
export {
    SearchBar,
}