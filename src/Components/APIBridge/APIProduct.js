import React from "react";
import API from '../../Utils/API'

export const createProduct = (product) => {
    console.log(product);
    return fetch(`${process.env.REACT_APP_APIURL}/productsRouter/product/create`, {
        method: 'POST',
        body: product
    }).then(response => {
            return response.json();
            console.log(response.json());
        })
        .catch(err => {
            console.log('ddddddddddddddddddddddd',err);
            alert(err);
        });
};

export const getProductsByCategory = (CATEGORY_ID) => {
    return fetch(`${process.env.REACT_APP_APIURL}/productsRouter/products/category/${CATEGORY_ID}`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const getProductsForHome = (sortBy,limit) => {
    return fetch(`${process.env.REACT_APP_APIURL}/productsRouter/products?sortBy=${sortBy}&order=desc&limit=${limit}`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};
//
// export const getPhotoForHome = PRODUCT_ID => {
//     return fetch(`http://localhost:8000/productsRouter/product/photo/5e99b26c40555909f89a8a18`, {
//         method: "GET"
//     })
//         .then(response => {
//             return response.json();
//         })
//         .catch(err => console.log('errrrresssssssssssssssssssssssssssssssssssss', err));
// };

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

export const getSingleProduct = productId => {
    return fetch(`${process.env.REACT_APP_APIURL}/productsRouter/product/${productId}`, {
        method: 'GET'
    })
        .then(response => {
            console.log(response)
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

export const getFilteredProducts = (skip, limit, filters = {}) => {
    const data = {
        limit,
        skip,
        filters
    };
    return fetch(`${process.env.REACT_APP_APIURL}/productsRouter/products/by/search`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
};