import axios from 'axios';

// axios.create() -> Cria uma config do axios, dizendo por exemplo de onde virão as requisições como no param baseURL
const Api = axios.create({
    baseURL: 'https://api.github.com',
});

export default Api;