import * as httpRequest from '~/utils/httpRequest';
export const getEmployee = async () => {
    try {
        const res = await httpRequest.get('Employee');
        return res.data;
    } catch (error) {
        console.log('error: ', error.message);
    }
};

export const getEmployeeById = async (id) => {
    try {
        const res = await httpRequest.get(`Employee/${id}`, {
            params: {},
        });
        return res;
    } catch (error) {
        console.log('error: ', error.message);
    }
};

export const createEmployee = async (name, content, video, courseCode) => {
    try {
        const res = await httpRequest.post('Employee', {
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

export const updateEmployee = async (id, name, content, video, courseCode) => {
    try {
        const res = await httpRequest.put(`Employee/${id}`, {
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

export const deleteEmployee = async (id) => {
    try {
        const res = await httpRequest.deleteRequest(`Employee/${id}`);
        return res;
    } catch (error) {
        console.log('error: ', error.message);
    }
};
