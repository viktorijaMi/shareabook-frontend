import axios from '../Custom-axios/oder-axios';

const OrderService = {

    createOrder: (user) => {
        return axios.post("/new-order", {
            "id" : user.id,
            "username" : user.username,
            "address" : {
                "street" : user.address.street,
                "streetNumber" : user.address.streetNumber,
                "city" : user.address.city,
                "country" : user.address.country
            }
        })
    },

    getAllOrders: () => {
        return axios.get(`/orders`);
    },

    getAllOrdersByUserId: (id) => {
        return axios.get(`/orders/${id}`);
    },

    addItem: (id, book, quantity) => {
        return axios.post(`/add/${id}`, {
            "book": book,
            "quantity": quantity
        });
    },

    getItemsById: (id) => {
        return axios.get(`/items/${id}`);
    },

    increaseQuantity: (orderId, orderItemId) => {
        console.log("orderItemId", orderItemId.id);
        return axios.post(`/increase-qty/${orderId}`, {
            "id": orderItemId.id
        });
    },

    decreaseQuantity: (orderId, orderItemId) => {
        return axios.post(`/decrease-qty/${orderId}`, {
            "id": orderItemId.id
        });
    },

    getTotalPrice: (orderId) => {
        return axios.get(`/total/${orderId}`);
    },
    
    getCurrencies: () => {
        return axios.get("/get-currency");
    },

    changeCurrency: (id, currency) => {
        return axios.get(`/change-total-currency/${id}`, {
            params: {
                "currency" : currency
            }
        })
    },

    placeOrder: (id, currency) => {
        return axios.post(`/place-order/${id}`,null, {
            params : {
                "currency" : currency,
            }
        })
    },

    findAllTotals : (orderIds) => {
        return axios.get("/all-total", {
            "orderIds" : orderIds
        });
    },

    deleteOrderItem : (orderId, orderItemId) => {
        return axios.post("/delete-item", {
            "orderId" : orderId,
            "orderItemId" : orderItemId
        })
    },

    cancelOrder : (orderId) => {
        return axios.post(`/cancel-order/${orderId}`)
    },

    processOrder: (orderId) => {
        return axios.post(`/order-processed/${orderId}`
        );
    }
}

export default OrderService;