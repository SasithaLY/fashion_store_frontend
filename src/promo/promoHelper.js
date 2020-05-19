import { API } from '../config';
import queryString from "query-string";

export const addPromoCode = (userId, token, promoData) => {
    return fetch(`${API}/admin/addPromocode/${userId}`, {
        method: "POST",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json",
            Authorization: `Bearer ${token}`
        },
        body:JSON.stringify(promoData)
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
 
}

export const getPromoCodes = (userId, token) => {
    return fetch(`${API}/admin/getPromocodes/${userId}`, {
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

export const updatePromoCode = (userId, token, promoId, promoData) => {
    return fetch(`${API}/admin/updatePromocode/${userId}/${promoId}`, {
        method: "PUT",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json",
            Authorization: `Bearer ${token}`
        },
        body:JSON.stringify(promoData)
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
}

export const deletePromoCode = (userId, token, promoId) => {
    return fetch(`${API}/admin/deletePromocode/${userId}/${promoId}`, {
        method: "DELETE",
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

export const search = (userId, token, params) => {
    const query = queryString.stringify(params);
    return fetch(`${API}/admin/promocodes/${userId}/search?${query}`, {
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

export const getSinglePromoCode = (userId, token, params) => {
    const query = queryString.stringify(params);
    console.log(query)
    return fetch(`${API}/admin/getSinglePromocode/${userId}/search?${query}`, {
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
