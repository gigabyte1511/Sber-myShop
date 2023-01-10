
import { useEffect, useMemo, useState} from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import styles from './App.module.css';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { Context } from './contexts/groupeContext';


function App() {
  const navigate = useNavigate();
  const [userGroupe, setUserGroupe] = useState('John Smith');
  const value = useMemo(
    () => ({ userGroupe, setUserGroupe }), 
    [userGroupe]
  );
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
        <Context.Provider value = {value}>
          <Header />
          <Outlet />
          <Footer />
        </Context.Provider>
      </div>
    );
}

export default App;
