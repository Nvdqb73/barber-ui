import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import ProductItem from './ProductItem';
import * as productServices from '~/services/productServices';
import styles from './Products.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);
function Products() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {
            const result = await productServices.getProduct();
            if (result) {
                setProducts(result);
            }
        };

        fetchApi();
    }, []);

    return (
        <div className={cx('wrapper')}>
            <Container>
                <Row md={3}>
                    {products.map((product) => (
                        <Col xs={6} key={product.proID}>
                            <ProductItem data={product} />
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    );
}

export default Products;
