// Метод получения всех продуктов
export const getProducts = (params) => fetch('https://api.react-learning.ru/products',{
    method: 'GET',
    headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`
    }
})
.then((res)=> {
    if(res.status !== 200){
        return res.json().then((data) => {
            throw new Error(data.message)
        });
    }
    return res.json();
})
.then((data)=> {
    return data;
})

// Метод получения продуктов по массиву ID
export const getProductsByIds = (idMass) => Promise.all(idMass.map(id => fetch(`https://api.react-learning.ru/products/${id}`,{
    method: 'GET',
    headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`
    }
})))
.then((resMass)=> {
    return Promise.all(resMass.map((res) => {
        if (res.status!== 200){
            return res.json().then((data) => {
                throw new Error(data.message)
                });
            }
        return res.json()
    }))
})
.then((dataMass)=> {
    //console.log(dataMass);
    return dataMass;
})





// Метод авторизации пользователя
export const signIn = (data) => fetch('https://api.react-learning.ru/signin',{
        method: 'POST',
        headers: {
        'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(data),
    })
    .then((res)=> {
        if(res.status !== 200){
            return res.json().then((data) => {
                throw new Error(data.message)
            });
        }
        return res.json();
    })
    .then((data)=> {
        return data;
    })

// Метод регистрации нового пользователя с автоматической авторизации в случае успеха
export const signUp = (userData) => fetch('https://api.react-learning.ru/signup',{
        method: 'POST',
        headers: {
        'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(userData),
    })
    .then((res)=> {
        if(res.status !== 201){
            return res.json().then((data) => {
                throw new Error(data.message)
            });
        }
        return res.json();
    })
    .then(()=> fetch('https://api.react-learning.ru/signin',{
        method: 'POST',
        headers: {
        'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify({
            email: userData.email,
            password: userData.password,
        })
    }))
    .then((res)=> {
        if(res.status !== 200){
            return res.json().then((data) => {
                throw new Error(data.message)
            });
        }
        return res.json();
    })
    .then((data)=> {
        return data;
    })
// Метод получения детальной информации пользователя
    export const getUserInfo = () => fetch('https://api.react-learning.ru/v2/sm8/users/me',{
        method: 'GET',
        headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })
    .then((res)=> {
        if(res.status !== 200){
            return res.json().then((data) => {
                throw new Error(data.message)
            });
        }
        return res.json();
    })
    .then((data)=> {
        return data;
    })
    