import * as httpRequest from '~/utils/httpRequest';

export const getProduct = async () => {
    try {
        const res = await httpRequest.get('Product');
        return res.data;
    } catch (error) {
        console.log(error.message);
    }
};

export const getProductById = async (id) => {
    try {
        const res = await httpRequest.get(`Product/${id}`);
        return res.data;
    } catch (error) {
        console.log(error.message);
    }
};

export const createProduct = async (
    name,
    image,
    describe,
    quantityLesson,
    quantityStudent,
    price,
    typeCode,
    instructorCode,
    adminCode,
) => {
    try {
        const res = await httpRequest.post('Product', {
            tenKH: name,
            hinh: image,
            moTa: describe,
            soLuongBH: quantityLesson,
            soLuongHocVien: quantityStudent,
            gia: price,
            maLoai: typeCode,
            maGV: instructorCode,
            maQTV: adminCode,
        });
        return res;
    } catch (error) {
        console.log(error.message);
    }
};

export const updateProduct = async (
    id,
    name,
    image,
    describe,
    quantityLesson,
    quantityStudent,
    price,
    typeCode,
    instructorCode,
    adminCode,
) => {
    try {
        const res = await httpRequest.put(`Product/${id}`, {
            tenKH: name,
            hinh: image,
            moTa: describe,
            soLuongBH: quantityLesson,
            soLuongHocVien: quantityStudent,
            gia: price,
            maLoai: typeCode,
            maGV: instructorCode,
            maQTV: adminCode,
        });
        return res;
    } catch (error) {
        console.log(error.message);
    }
};

export const deleteProduct = async (id) => {
    try {
        const res = await httpRequest.deleteRequest(`Product/${id}`);
        return res;
    } catch (error) {
        console.log(error.message);
    }
};
