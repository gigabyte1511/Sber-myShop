
import { useEffect} from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import styles from './App.module.css';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';

function App() {
  
  const navigate = useNavigate();
  useEffect(() => {
    //Проверка на наличие токена:
    //  Есть - выполнение отображения компонента с товарами
    //  Нет - отображение компонента авторизации
    if (localStorage.getItem('token')){
      navigate('/main');
    }
    else navigate('/sign');
  },[]);

    return (
      <div className={styles.vrapper}>
        <Header />
        <Outlet />
        <Footer />
      </div>
    );
}

export default App;
