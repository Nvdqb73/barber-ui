import * as httpRequest from '~/utils/httpRequest';
export const getService = async () => {
    try {
        const res = await httpRequest.get('Service');
        return res.data;
    } catch (error) {
        console.log('error: ', error.message);
    }
};

export const getServiceById = async (id) => {
    try {
        const res = await httpRequest.get(`Service/${id}`, {
            params: {},
        });
        return res;
    } catch (error) {
        console.log('error: ', error.message);
    }
};

export const createService = async (name, content, video, courseCode) => {
    try {
        const res = await httpRequest.post('Service', {
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

export const updateService = async (id, name, content, video, courseCode) => {
    try {
        const res = await httpRequest.put(`Service/${id}`, {
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

export const deleteService = async (id) => {
    try {
        const res = await httpRequest.deleteRequest(`Service/${id}`);
        return res;
    } catch (error) {
        console.log('error: ', error.message);
    }
};
