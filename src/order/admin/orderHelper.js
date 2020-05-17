import { API } from '../../config';
import queryString from "query-string";

export const getOrders = (userId, token) => {
    return fetch(`${API}/order/getlist/${userId}`, {
        method: "GET",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json",
            Authorization: `Bearer ${token}`
        }
    })
    .then(Response => {
        return Response.json();
    })
    .catch(err => console.log(err));
}

export const getStatus = (userId, token) => {
    return fetch(`${API}/order/states/${userId}`, {
        method: "GET",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json",
            Authorization: `Bearer ${token}`
        }
    })
    .then(Response => {
        return Response.json();
    })
    .catch(err => console.log(err));
}

export const updateStatus = (userId, token, orderId, status) => {
    return fetch(`${API}/order/${orderId}/status/${userId}`, {
        method: "PUT",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({status, orderId})
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
}

export const getOrdersHistory = (userId, token) => {
    return fetch(`${API}/oder/by/user/${userId}`, {
        method: "GET",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json",
            Authorization: `Bearer ${token}`
        }
    })
    .then(Response => {
        return Response.json();
    })
    .catch(err => console.log(err));
}


export const ordersList = (userId, token, params) => {
    const query = queryString.stringify(params);
    console.log('query', query);
    return fetch(`${API}/oders/${userId}/search?${query}`, {
        method: "GET",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json",
            Authorization: `Bearer ${token}`
        }
    })
    .then(Response => {
        return Response.json();
    })
    .catch(err => console.log(err));
}

export const searchOrderHistory = (userId, token, params) => {
    const query = queryString.stringify(params);
    console.log('query', query);
    return fetch(`${API}/oders/by/user/${userId}/search?${query}`, {
        method: "GET",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json",
            Authorization: `Bearer ${token}`
        }
    })
    .then(Response => {
        return Response.json();
    })
    .catch(err => console.log(err));
}