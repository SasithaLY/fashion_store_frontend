import { API } from '../config';
import queryString from "query-string";

export const addCountry = (userId, token, countryData) => {
    return fetch(`${API}/admin/addlocation/${userId}`, {
        method: "POST",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json",
            Authorization: `Bearer ${token}`
        },
        body:JSON.stringify(countryData)
    })
    .then(Response => {
        return Response.json();
    })
    .catch(err => console.log(err));

}

export const getCountries = (userId, token) => {
    return fetch(`${API}/admin/getlocations/${userId}`, {
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

export const updateCountry = (userId, token, locationId, countryData) => {
    return fetch(`${API}/admin/updatelocation/${userId}/${locationId}`, {
        method: "PUT",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json",
            Authorization: `Bearer ${token}`
        },
        body:JSON.stringify(countryData)
    })
    .then(Response => {
        return Response.json();
    })
    .catch(err => console.log(err));
}

export const deleteCountry = (userId, token, locationId) => {
    return fetch(`${API}/admin/deletelocation/${userId}/${locationId}`, {
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
    return fetch(`${API}/admin/locations/${userId}/search?${query}`, {
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

export const getSingleCountry = (userId, token, locationId) => {
    return fetch(`${API}/admin/getSinglelocation/${userId}/${locationId}`, {
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

