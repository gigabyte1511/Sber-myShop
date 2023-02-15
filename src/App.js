import { useSelector } from 'react-redux';
import { useEffect} from 'react';
import { Outlet, useLocation, useNavigate} from 'react-router-dom';
import styles from './App.module.css';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';

function App() {
  
  const navigate = useNavigate();
  const {pathname} = useLocation();
  const token = useSelector((store) => store.user.token);
  useEffect(() => {
    //Проверка на наличие токена:
    //  Есть - выполнение отображения компонента с товарами
    //  Нет - отображение компонента авторизации
    if (token){
      if(pathname === '/') navigate("/main");
      else navigate(pathname);
    }
    else navigate('/sign');
  },[]);
    return (
      <div className={styles.vrapper}>
          <Header />
          <div className={styles.body}>
            <Outlet />
          </div>
          <Footer />
      </div>
    );
}

export default App;
