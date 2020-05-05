import { API } from '../../config';

export const getBraintreeToken = (userId, token) =>{
    return fetch(`${API}/braintree/getToken/${userId}`, {
        method: "GET",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json",
            Authorization: `Bearer ${token}`
        }
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
}

export const processPayment = (userId, token, payData) =>{
    return fetch(`${API}/braintree/payment/${userId}`, {
        method: "POST",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payData)
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
}

export const getAddresses = (userId, token) => {
    return fetch(`${API}/address/by/user/${userId}`, {
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


export const insertAddress = (userId, token, address) => {
    return fetch(`${API}/address/create/${userId}`, {
        method: "POST",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json",
            Authorization: `Bearer ${token}`
        },
        body:JSON.stringify(address)
    })
    .then(Response => {
        return Response.json();
    })
    .catch(err => console.log(err));
}

export const updateAddress = (userId, token, addressId,address) => {
    return fetch(`${API}/address/${addressId}/${userId}`, {
        method: "PUT",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json",
            Authorization: `Bearer ${token}`
        },
        body:JSON.stringify(address)
    })
    .then(Response => {
        return Response.json();
    })
    .catch(err => console.log(err));
}

export const deleteAddress = (userId, addressId, token) => {
    return fetch(`${API}/address/${addressId}/${userId}`, {
        method: "DELETE",
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

export const createOrder = (userId, token, orderData) => {
    return fetch(`${API}/order/create/${userId}`, {
        method: "POST",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json",
            Authorization: `Bearer ${token}`
        },
        body:JSON.stringify({order: orderData})
    })
    .then(Response => {
        return Response.json();
    })
    .catch(err => console.log(err));
}