import * as httpRequest from '~/utils/httpRequest';

export const getCategory = async () => {
    try {
        const res = await httpRequest.get('Category');

        return res.data;
    } catch (error) {
        console.log('error: ', error.message);
    }
};

export const createCourseType = async (typeName) => {
    try {
        const res = await httpRequest.post('LoaiKHs', {
            tenLoai: typeName,
        });
        return res;
    } catch (error) {
        console.log('error: ', error.message);
    }
};

export const updateCourseType = async (typeId, typeName) => {
    try {
        const res = await httpRequest.put(`LoaiKHs/${typeId}`, {
            tenLoai: typeName,
        });

        return res;
    } catch (error) {
        console.log('error: ', error.message);
    }
};

export const deleteCourseType = async (id) => {
    try {
        const res = await httpRequest.deleteRequest(`LoaiKHs/${id}`);
        return res;
    } catch (error) {
        console.log('error: ', error.message);
    }
};
