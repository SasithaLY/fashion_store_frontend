import {API} from "../config";
import queryString from 'query-string';

export const createWishlist = (userId, token, createWishData) => {
    
    return fetch(`${API}/wishlist/create/${userId}`, {
        method: "POST",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json",
            Authorization: `Bearer ${token}`
        },
        body : JSON.stringify({wishlist: createWishData})
    })
    .then(Response => {
        return Response.json();
    })
    .catch(err => console.log(err));
};

export const getWishList = (userId, token) => {
    return fetch(`${API}/wishlist/readWishList/${userId}`, {
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
};

export const deleteWishList = (wishlistId, userId, token) => {
    return fetch(`${API}/wishlist/deleteWishList/${wishlistId}/${userId}`, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const countTotal = () =>{
    getWishList().then((data) =>{
        const count = data.length;
        return count;
      })
    
}
