import axios from './axios';

export function addCart(params: any) {
  return axios.post('/shop-cart', params);
}

export function modifyCart(params: any) {
  return axios.put('/shop-cart', params);
}

export function getCart(params: any) {
  return axios.get('/shop-cart', { params });
}

export function deleteCartItem(id: any) {
  return axios.delete(`/shop-cart/${id}`);
}

export function getByCartItemIds(params: any) {
  return axios.get('/shop-cart/settle', { params });
}
