import * as httpRequest from '~/utils/httpRequest';
export const getAddress = async () => {
    try {
        const res = await httpRequest.get('Address');
        return res.data;
    } catch (error) {
        console.log('error: ', error.message);
    }
};

export const getAddressById = async (id) => {
    try {
        const res = await httpRequest.get(`Address/${id}`, {
            params: {},
        });
        return res.data;
    } catch (error) {
        console.log('error: ', error.message);
    }
};

export const createAddress = async (firstName, lastName, email, userID) => {
    try {
        const res = await httpRequest.post('Address', {
            firstName,
            lastName,
            picture: 'null',
            email,
            numberphone: 'null',
            dateOfBirth: '2023-01-01',
            userID,
        });
        return res;
    } catch (error) {
        console.log('error: ', error.message);
    }
};

export const updateAddress = async (id, firstName, lastName, picture = 'string', email, phone, dateOfBirth, userID) => {
    try {
        const res = await httpRequest.put(`Address/${id}`, {
            firstName,
            lastName,
            picture: picture,
            email,
            numberphone: phone,
            dateOfBirth,
            userID,
        });

        return res.data;
    } catch (error) {
        console.log('error: ', error.message);
    }
};

export const deleteAddress = async (id) => {
    try {
        const res = await httpRequest.deleteRequest(`Address/${id}`);
        return res;
    } catch (error) {
        console.log('error: ', error.message);
    }
};
