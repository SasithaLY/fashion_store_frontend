import { API } from '../../config';

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