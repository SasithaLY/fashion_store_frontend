import React from "react";
import API from '../../Utils/API'

export const createProduct = (product) => {
    console.log(product);
    return fetch(`${process.env.REACT_APP_APIURL}/productsRouter/product/create`, {
        method: 'POST',
        body: product
    })
        .then(response => {
            return response.json();
            console.log(response.json());
        })
        .catch(err => {
            console.log(err);
        });
};

export const getProducts = () => {
    return fetch(`${API}/products?limit=undefined`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const getProductsForHome = sortBy => {
    return fetch(`${process.env.REACT_APP_APIURL}/productsRouter/products?sortBy=${sortBy}&order=desc&limit=4`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const deleteProduct = (productId, userId, token) => {
    return fetch(`${API}/product/${productId}/${userId}`, {
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

export const getProduct = productId => {
    return fetch(`${API}/product/${productId}`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const updateProduct = (productId, userId, token, product) => {
    return fetch(`${API}/product/${productId}/${userId}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: product
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};


export const getCategories = () => {
    console.log(process.env.REACT_APP_APIURL, '/categoriesRouter/all');
    return fetch(`${process.env.REACT_APP_APIURL}/categoriesRouter/all`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};