import * as httpRequest from '~/utils/httpRequest';
export const getOrder = async () => {
    try {
        const res = await httpRequest.get('Order');

        return res.data;
    } catch (error) {
        console.log('error: ', error.message);
    }
};

export const getOrderById = async (id) => {
    try {
        const res = await httpRequest.get(`Order/${id}`, {
            params: {},
        });
        return res.data;
    } catch (error) {
        console.log('error: ', error.message);
    }
};

export const createOrder = async (orderStatus = 'Chưa xác nhận', totalInvoice, customerID, payID) => {
    try {
        const res = await httpRequest.post('Order', {
            orderStatus: orderStatus,
            totalInvoice,
            customerID,
            payID,
        });
        return res.data;
    } catch (error) {
        console.log('error: ', error.message);
    }
};

export const updateOrder = async (id, name, content, video, courseCode) => {
    try {
        const res = await httpRequest.put(`Order/${id}`, {
            tenBH: name,
            noiDungBH: content,
            content: video,
            video: video,
            maKH: courseCode,
        });

        return res;
    } catch (error) {
        console.log('error: ', error.message);
    }
};

export const deleteOrder = async (id) => {
    try {
        const res = await httpRequest.deleteRequest(`Order/${id}`);
        return res;
    } catch (error) {
        console.log('error: ', error.message);
    }
};
