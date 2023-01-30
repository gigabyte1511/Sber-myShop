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
import { CreateProduct } from './components/CreateProduct/CreateProduct';
import { EditInfo } from './components/UserInfo/EditInfo/EditInfo';
import { EditPicture } from './components/UserInfo/EditPicture/EditPicture';
import { ProductEdit } from './components/ProductEdit/ProductEdit';


/*  
  Реализовано:
      - Товары:
        1. Получение и отображение всех товаров с фильтрацией по названию с оптимизацией debounce.
        2. Страница с детальным товаром
        3. Выделение и редактирование своих товаров
        4. Добавление нового товара
      - Комментарии:
        1. Отображение комментариев к товарам
      - Корзина: 
        1. Возможность добавить товар в корзину
        2. Отображение колличества товаров в корзине рядом с иконкой в шапке сайта
        3. Получение информации о товарах с сервера по ID и их отображение
        4. Реализовано изменение количества товара, учтено максимальное ограничение 
        5. Удаление товара из корзины при значении его количества < 1
        6. Выбор товаров в корзине и расчет их стоимости
        7. Добавлена заглушка при отсутствии товаров в корзине
        8. Сохранение товаров в localStorage
      - Избранное:
        1. Добавление товаров в избранное
        2. Удаление товаров из избранного
        3. Сохраннение в localStorage
      - Пользователь:
        1. Аторизация
        2. Регистрация
        3. Редактирование информации о пользователе
        4. Выход пользователя
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
        children: [
          {
            path: "editInfo",
            element: <EditInfo />,
          },
          {
            path: "editPicture",
            element: <EditPicture />,
          },
        ]
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
        path: "*",
        element: <ProductDetailed />,
      },
      {
        path: "createProduct",
        element: <CreateProduct />,
      },
      {
        path: "edit",
        element: <ProductEdit />,
      }
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