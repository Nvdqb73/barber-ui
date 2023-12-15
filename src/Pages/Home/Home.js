import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import Marquee from 'react-fast-marquee';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import * as productServices from '~/services/productServices';
import ProductItem from '~/components/feature/Products/ProductItem';
import styles from './Home.module.scss';
import SlideShow from '~/components/Layouts/components/feature/SlideShow/SlideShow';

const cx = classNames.bind(styles);

function Home() {
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
            <div className={cx('slideshow')}>
                <section className={cx('slideshow-wrapper')}>
                    <SlideShow />
                </section>
            </div>
            <div className={cx('content')}></div>

            <div className={cx('wrapper_item')}>
                <h1 style={{ fontWeight: 'bold' }}>Sản Phẩm</h1>
                <Container className={cx('container')}>
                    <Row xs={1} className={cx('product-row')}>
                        {products.map((product) => (
                            <Col xs={12} md={6} lg={3} className={`col4 mb-4`} key={product.proID}>
                                <ProductItem data={product} />
                            </Col>
                        ))}
                    </Row>
                </Container>
            </div>

            <div className={cx('wrapper_item')}>
                <h1 style={{ fontWeight: 'bold' }}>Các kiểu tóc</h1>
                <Marquee className="d-flex">
                    <div className="mx-4 w-25">
                        <img
                            src="https://cdn.tgdd.vn/Files/2023/01/10/1502553/30-kieu-toc-nam-2023-dep-cuc-cuon-hut-theo-dang-khuon-mat-202301110013136351.jpg"
                            style={{ width: '300px', height: '200px' }}
                            alt="brand"
                        />
                    </div>
                    <div className="mx-4 w-25">
                        <img
                            src="https://cdn.tgdd.vn/Files/2023/01/10/1502553/30-kieu-toc-nam-2023-dep-cuc-cuon-hut-theo-dang-khuon-mat-202301110015595291.jpg"
                            style={{ width: '300px', height: '200px' }}
                            alt="brand"
                        />
                    </div>
                    <div className="mx-4 w-25">
                        <img
                            src="https://product.hstatic.net/200000061028/product/3020153-1_b95a19f95abc42639639839af382a917_grande.jpg"
                            style={{ width: '300px', height: '200px' }}
                            alt="brand"
                        />
                    </div>
                    <div className="mx-4 w-25">
                        <img
                            src="https://product.hstatic.net/200000061028/product/3020153-1_b95a19f95abc42639639839af382a917_grande.jpg"
                            style={{ width: '300px', height: '200px' }}
                            alt="brand"
                        />
                    </div>
                    <div className="mx-4 w-25">
                        <img
                            src="https://cdn.tgdd.vn/Files/2023/01/10/1502553/30-kieu-toc-nam-2023-dep-cuc-cuon-hut-theo-dang-khuon-mat-202301110022141312.jpg"
                            style={{ width: '300px', height: '200px' }}
                            alt="brand"
                        />
                    </div>
                    <div className="mx-4 w-25">
                        <img
                            src="https://product.hstatic.net/200000061028/product/3020153-1_b95a19f95abc42639639839af382a917_grande.jpg"
                            style={{ width: '300px', height: '200px' }}
                            alt="brand"
                        />
                    </div>
                </Marquee>
            </div>
        </div>
    );
}

export default Home;
