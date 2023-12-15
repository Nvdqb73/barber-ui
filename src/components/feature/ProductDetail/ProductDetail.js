import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import styles from './ProductDetail.module.scss';

import * as productServices from '~/services/productServices';

import ProductDetailItem from './ProductDetailItem';

const cx = classNames.bind(styles);

function ProductDetail() {
    const { id } = useParams();
    const [productItems, setProductItem] = useState({});

    useEffect(() => {
        const fetchApi = async () => {
            const result = await productServices.getProductById(id);
            if (result) {
                setProductItem(result);
            }
        };

        fetchApi();
    }, [id]);

    return (
        <div className={cx('wrapper')}>
            <div className="container">
                <ProductDetailItem data={productItems} />
            </div>
        </div>
    );
}

export default ProductDetail;
