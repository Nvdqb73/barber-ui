import * as httpRequest from '~/utils/httpRequest';
export const getCustomer = async () => {
    try {
        const res = await httpRequest.get('Customer');
        return res.data;
    } catch (error) {
        console.log('error: ', error.message);
    }
};

export const getCustomerById = async (id) => {
    try {
        const res = await httpRequest.get(`Customer/${id}`, {
            params: {},
        });
        return res;
    } catch (error) {
        console.log('error: ', error.message);
    }
};

export const createCustomer = async (customerID, startDate, startTime, payID) => {
    try {
        const res = await httpRequest.post('Customer', {
            customerID,
            startDate,
            startTime,
            payID,
        });
        return res;
    } catch (error) {
        console.log('error: ', error.message);
    }
};

export const updateCustomer = async (id, name, content, video, courseCode) => {
    try {
        const res = await httpRequest.put(`Customer/${id}`, {
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

export const deleteCustomer = async (id) => {
    try {
        const res = await httpRequest.deleteRequest(`Customer/${id}`);
        return res;
    } catch (error) {
        console.log('error: ', error.message);
    }
};
