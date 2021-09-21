import axios from '../Custom-axios/oder-axios';

const OrderService = {

    createOrder: () => {
        return axios.get("/new-order")
    },

    getAllOrders: () => {
        return axios.get("/orders");
    },

    addItem: (id, book, quantity) => {
        return axios.post(`/add/${id}`, {
            "book": book,
            "quantity": quantity
        });
    },

    deleteItem: (id, orderItemId) => {
        return axios.post("/delete", {
            "id": id,
            "orderItemId": orderItemId
        });
    },

    getItemsById: (id) => {
        return axios.get(`/items/${id}`);
    },

    increaseQuantity: (orderId, orderItemId) => {
        console.log("order id in service", orderItemId);
        return axios.post(`/increase-qty/${orderId}`, {
            "orderItemId": orderItemId.id
        });
    },

    decreaseQuantity: (orderId, orderItemId) => {
        return axios.post(`/decrease-qty/${orderId}`, {
            "orderItemId": orderItemId.id
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
    }
    
}

export default OrderService;