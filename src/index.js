import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createBrowserRouter, RouterProvider} from 'react-router-dom';
import { Main } from './components/Main/Main';
import { Sign } from './components/Sign/Sign';
import { UserInfo } from './components/UserInfo/UserInfo';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
/*  
  12/11/2022
    На данный момент реализовано:
      - регистрация нового пользователя
      - аторизация пользователя
      - отображение товаров
      - отображение информации о пользователе и кнопка его выхода
  ---------------------------------------------------------------------
    Структура приложения:
      Header: - статичный компонент-заголовок
        Logo
        SearchBar
        HeaderNavigtion
      Main:
        Product
      Sign:
        SignIn
        SignUp
      UserInfo
      Footer: - статичный компонент-подвал
        Logo
        FooterNavigation
        FooterNavigation
  ---------------------------------------------------------------------
    Принцип работы:
      При первом запуске в "корневом *" компоненте App выполняется проверка на наличие в localStorage токена авторизации. Если он в наличии, 
    то выполняется переход navigate('/main') в компонент Main, где выполняется получение товаров с сервера и их отрисовка.
    В случае, если токен отсутствует, выполняется переход navigate('/sign') в компонент Sign. По умолчанию благодаря useState(<SignIn />)
    в компоненте Sign отрисовывается компонент авторизации SignIn, при помощи компонента кнопок DoubleSelectot можно выполнить отрисовку компонента
    SignUp и выполнить регистрацию нового пользователя (в случае успеха аторизация выполнится автоматически). В случае успешной авторизации или 
    регистрации выполняется роутинг navigate('/main') в компонент Main, выполняется получение товаров с сервера и их отрисовка.
      В шапке сайта в правом углу находится компонент HeaderNavigation, в котором есть кнопка-иконка пользователя. При нажатии в компоненте 
    HeaderNavigation выполняется проверка на наличе токена аторизации (это необходимо для того, чтобы исключить отрисовку компонента UserInfo без прохождения аторизации),
    а также выполняется роутинг navigate("/userInfo") в компонент userInfo, где отображена инвормация о пользователе, кнопка Close для возвращения в компонент Main с товарами
    и кнопка Sing Out, по нажатии на которую выполняется удаление токена и роутинг navigate("/sign") в компонент авторизации Sign.
      Так же в шапке в левом углу находится компонент Logo, при нажатии на который выполняется рутинг navigate('/main') в компонент Main.
      Все взаимодействие сервером определено в "компоненте **"" serverApi.
  ---------------------------------------------------------------------
    Вопросы:
      * Можно ли компонет App считать корневым? Тогда как "обозвать" компонент Index.js?
      ** Файл serverApi.js, в котором определен класс Api с методами "общения" с сервером, можно считать компонентом?
      В этом приложении роутинг определяет, какой компонет будет отрисован между компонентом Header и Footer. Это могут быть компонеты Main, Sign и UserInfo.
    Правильный ли это подход?
  ---------------------------------------------------------------------
    Не применен контекст
    Не подключен линтер
   ---------------------------------------------------------------------
    Спасибо(Рахмет)!
*/

const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {
        path: "sign",
        element: <Sign />,
      },
      {
        path: "main",
        element: <Main />,
      },
      {
        path: "userInfo",
        element: <UserInfo />,
      },
    ],
  },
]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <QueryClientProvider client = {queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);