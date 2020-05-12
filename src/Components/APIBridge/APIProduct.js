import React from "react";

export const createProduct = (product, token, userId) => {
    console.log(product);
    return fetch(`${process.env.REACT_APP_APIURL}/productsRouter/product/create/${userId}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
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


export const deleteProduct = (productId, userId, token) => {
    return fetch(`${process.env.REACT_APP_APIURL}/productsRouter/product/remove/${productId}/${userId}`, {
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

export const updateProduct = (productId, product, userId, token) => {
    return fetch(`${process.env.REACT_APP_APIURL}/productsRouter/product/updateProduct/${productId}/${userId}`, {
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

export const createCategory = (data, token, userId) => {
    console.log(data)
    return fetch(`${process.env.REACT_APP_APIURL}/categoriesRouter/addCategory/${userId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data)
    }).then(response => {
        return response.json();
        console.log(response.json());
    })
        .catch(err => {
            console.log('ddddddddddddddddddddddd',err);
            alert(err);
        });
};

export const getCategories = () => {
    return fetch(`${process.env.REACT_APP_APIURL}/categoriesRouter/all`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const updateCategory = (id, category, token, userId) => {
    console.log(JSON.stringify(category));
    return fetch(`${process.env.REACT_APP_APIURL}/categoriesRouter/updateCategory/${id}/${userId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(category)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const deleteCategory = (data, id, token, userId) => {
    return fetch(`${process.env.REACT_APP_APIURL}/categoriesRouter/deleteCategory/${id}/${userId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            console.log(response)
            return response.json();
        })
        .catch(err => console.log(err));
};

export const getProduct = productId => {
    return fetch(`${process.env.REACT_APP_APIURL}/productsRouter/product/${productId}`, {
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
    console.log(filters)
    return fetch(`${process.env.REACT_APP_APIURL}/productsRouter/products/withFilter`, {
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

export const getProductsByAdmin = (skip, limit, token, filters = {}) => {
    const data = {
        limit,
        skip,
        filters
    };

    console.log(token)
    return fetch(`${process.env.REACT_APP_APIURL}/productsRouter/products/productsByAdmin`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
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

export const updateReviewOnProduct = (productId, data) => {
    console.log(JSON.stringify(data));
    return fetch(`${process.env.REACT_APP_APIURL}/productsRouter/updateReview/${productId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};