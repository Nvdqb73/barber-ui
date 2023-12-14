import * as httpRequest from '~/utils/httpRequest';
export const getStore = async () => {
    try {
        const res = await httpRequest.get('Store');
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const getStoreById = async (id) => {
    try {
        const res = await httpRequest.get(`Store/${id}`, {
            params: {},
        });
        return res;
    } catch (error) {
        console.log('error: ', error.message);
    }
};

export const createStore = async (name, content, video, courseCode) => {
    try {
        const res = await httpRequest.post('Store', {
            tenBH: name,
            noiDungBH: content,
            video: video,
            maKH: courseCode,
        });
        return res;
    } catch (error) {
        console.log('error: ', error.message);
    }
};

export const updateStore = async (id, name, content, video, courseCode) => {
    try {
        const res = await httpRequest.put(`Store/${id}`, {
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

export const deleteStore = async (id) => {
    try {
        const res = await httpRequest.deleteRequest(`Store/${id}`);
        return res;
    } catch (error) {
        console.log('error: ', error.message);
    }
};
