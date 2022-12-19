
export const getProducts = (params) => {
    console.log(params);
    const test = fetch('https://api.react-learning.ru/products',{
    method: 'GET',
    headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`
    }
})
.then((res)=>res.json());
return test;
}


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
                // console.log(userData);
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

    

