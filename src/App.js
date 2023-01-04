
import { useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import styles from './App.module.css';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { addToCartAC } from './redux/actionCreators/cartAC';


function App() {
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    //Проверка на наличие токена:
    //  Есть - выполнение отображения компонента с товарами
    //  Нет - отображение компонента авторизации
    if (localStorage.getItem('token')){
      navigate('/main');
    }
    else navigate('/sign');
  },[]);

  const test = () => {
    console.log('test');
    dispatch(addToCartAC("test"));
  }

    return (
      <div className={styles.vrapper}>
        <Header />
        {/* <button onClick={test}>Test</button> */}
        <Outlet />
        <Footer />
      </div>
    );
}

export default App;
