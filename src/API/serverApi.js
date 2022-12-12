 class Api {
    constructor(params, callback) { // тело конструктора
        this.params = params;
        this.token = localStorage.getItem('token');
        this.callbackTest = callback;
    }
    async signIn(){

        const data = {
            email: this.params.email,
            password: this.params.password
        };
            const response = await fetch('https://api.react-learning.ru/signin', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json; charset=utf-8'
                },
                body: JSON.stringify(data),
            });
            const responseObj = await response.json();
            if (response.status !== 200){
                console.log(responseObj.status);
                throw new Error(`${responseObj.error}: ${responseObj.message}`);
            }else {
            localStorage.setItem("token", responseObj.token)
            return responseObj;
            }
    }
    async signUp(){
        const data = {
            email: this.params.email,
            group: this.params.group,
            password: this.params.password
        };
        //console.log(data);
        const response = await fetch('https://api.react-learning.ru/signup', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify(data),
        });
        const responseObj = await response.json();
        if (response.status !== 201){
            console.log(responseObj.status);
            throw new Error(`${responseObj.error}: ${responseObj.message}`);
        }else {
            return responseObj;
        }
    }
    async getProducts(){
        //console.log(data);
        const response = await fetch('https://api.react-learning.ru/products', {
            method: 'GET',
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        const responseObj = await response.json();
        return responseObj;
    }
    async getUserInfo(){
        //console.log(data);
        const response = await fetch('https://api.react-learning.ru/v2/sm8/users/me', {
            method: 'GET',
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        const responseObj = await response.json();
        return responseObj;
    }
    
   
}
export default Api;
    // другие методы работы с API 

    // const api = new Api({
    // baseUrl: 'https://api.react-learning.ru', headers: {
    // authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjJmOTk5MmFlNWM0MGMx MGMxMWRmZTQiLCJpYXQiOjE2NDcyODY2ODEsImV4cCI6MTY3ODgyMjY4MX0.WHKXAErKZtY445yXecOFZsx981MuXicJti-o kSY-tac',
    // 'Content-Type': 'application/json' },
    // groupId: '/v2/group-7' });