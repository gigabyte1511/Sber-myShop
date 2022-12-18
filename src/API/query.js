
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

export const signUp = (data) => {
    console.log(`Params in signUp:`)
    console.log(data)
    const test = fetch('https://api.react-learning.ru/signup', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(data),
    })
    .then((res)=> res.json())
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


