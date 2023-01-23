import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createBrowserRouter, RouterProvider} from 'react-router-dom';
import { Main } from './components/Main/Main';
import { Sign } from './components/Sign/Sign';
import { UserInfo } from './components/UserInfo/UserInfo';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Cart } from './components/Cart/Cart';
import { Provider } from 'react-redux'
import { store } from './redux/store';
import { Favourite } from './components/Favourite/Favourite';
import { ProductDetailed } from './components/ProductDetailed/ProductDetailed';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


/*  
  12/01/2023
    Что нового?
      - Добавлена корзина: 
        1. Возможность добавить товар в корзину
        2. Отображение колличества товаров в корзине рядом с иконкой в шапке сайта
        3. Получение информации о товарах с сервера по ID и их отображение
        4. Реализовано изменение количества товара, учтено максимальное ограничение 
        5. Удаление товара из корзины при значении его количества < 1
        6. Выбор товаров в корзине и расчет их стоимости
        7. Добавлена заглушка при отсутствии товаров в корзине
        8. Сохранение товаров в localStorage
      - Добавлен поиск по товарам с оптимизацией debounce
      - Применен redux для доступа компонентов к глобальному состоянию:
        1. Сохранение токена авторизации в сторе редакса
        2. Храннение названия группы пользователя для работы страницы детального пользователя
        3. Хранение ключа поиска товаров
        4. Хранение id, цены, цены с учетом скидки, количество товара, макс.кол. товара
  ---------------------------------------------------------------------

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
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "favourite",
        element: <Favourite />,
      },
      {
        path: "productDetailed/*",
        element: <ProductDetailed />,
      },
    ],
  },
]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ToastContainer autoClose={2000} hideProgressBar={true} theme="colored" />
    <Provider store={store}>
    <QueryClientProvider client = {queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);