import * as httpRequest from '~/utils/httpRequest';
export const getUser = async () => {
    try {
        const res = await httpRequest.get('User');
        return res.data;
    } catch (error) {
        console.log('error: ', error.message);
    }
};

export const getUserById = async (id) => {
    try {
        const res = await httpRequest.get(`User/${id}`, {
            params: {},
        });
        return res.data;
    } catch (error) {
        console.log('error: ', error.message);
    }
};

export const createUser = async (userName, password) => {
    try {
        const res = await httpRequest.post('User', {
            userName,
            password,
            roleID: 2,
        });
        return res;
    } catch (error) {
        console.log('error: ', error.message);
    }
};

export const updateUser = async (id, userName, password, name, email, image, roleID) => {
    try {
        const res = await httpRequest.put(`User/${id}`, {
            tenDangNhap: userName,
            password: password,
            tenND: name,
            email: email,
            avatar: image,
            roleID: roleID,
        });

        return res;
    } catch (error) {
        console.log('error: ', error.message);
    }
};

export const deleteUser = async (id) => {
    try {
        const res = await httpRequest.deleteRequest(`User/${id}`);
        return res;
    } catch (error) {
        console.log('error: ', error.message);
    }
};

export const loginUser = async (userName_L, password_L) => {
    try {
        const res = await httpRequest.post('Auth/login', {
            userName: userName_L,
            password: password_L,
            roleID: 2,
        });
        return res;
    } catch (error) {
        console.log('error: ', error.message);
    }
};

export const registerUser = async (userName, password) => {
    try {
        const res = await httpRequest.post('Auth/register', {
            userName,
            password,
            roleID: 2,
        });
        return res;
    } catch (error) {
        console.log('error: ', error.message);
    }
};
