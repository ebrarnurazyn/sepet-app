import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  headers: {
    'Content-Type': 'application/json',
  },
}); // bu katman zaten sadece apı ye nasıl bağlanacağız
//ayarı , projeye özel bir şey içermiyor