import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { IconChevronLeft } from '@tabler/icons-react';
import styles from './InfoProductOrder.module.scss';
import { Link } from 'react-router-dom';
import Image from '~/components/common/Image';
import Button from '~/components/common/Button';
import { convertPrice } from '~/utils/convert';
import config from '~/config';

import * as orderServices from '~/services/orderServices';
import * as productOrderServices from '~/services/productOrderServices';
import { toast } from 'react-toastify';

const cx = classNames.bind(styles);

function InfoProductOrder({ ...props }) {
    const [carts, setCarts] = useState();

    const { state, checked } = props;

    useEffect(() => {
        const carts = localStorage.getItem('persist:root');
        if (carts) {
            const partCarts = JSON.parse(carts);
            const partListCart = partCarts?.carts;
            const ParseListCart3 = JSON.parse(partListCart);

            setCarts(ParseListCart3);
        }
    }, []);
    const handleAddOrder = async () => {
        try {
            const order = await orderServices.createOrder(undefined, carts?.total, state?.customerID, checked);
            console.log('order', order);
            for (let index = 0; index < carts?.list.length; index++) {
                const data = {
                    proOrderQuantity: carts?.list[index].quantity,
                    orderID: order?.orderID,
                    proID: carts?.list[index].proID,
                };
                await productOrderServices.createProductOrder(data);
            }

            toast.success('Đặt hàng thành công!');
            localStorage.removeItem('persist:root');
            setTimeout(function () {
                window.location.replace('/cart');
            }, 2000);
        } catch (error) {
            toast.error('Đặt hàng thất bại');
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('heading-info')}>
                <h2>Đơn hàng ({carts?.count} sản phẩm)</h2>
            </div>
            <div className={cx('form-product')}>
                {carts?.list.map((product) => (
                    <div className={cx('content-info')} key={product?.proID}>
                        <div>
                            <Image src={product?.proImage} alt={product?.proName} className={cx('image-product')} />
                            <p className={cx('quantity-product')}>{product?.quantity}</p>
                        </div>
                        <div>
                            <p className={cx('title')}>{product?.proName}</p>
                        </div>

                        <span className={cx('info-line-height')}>{convertPrice(product?.price)}</span>
                    </div>
                ))}

                <div className={cx('form-content')}>
                    <div className={cx('form-provisional')}>
                        <label className={cx('title-temple')}>Tạm tính</label>

                        <span className={cx('info-price')}>{convertPrice(carts?.total)}</span>
                    </div>
                    <div className={cx('form-provisional')}>
                        <label className={cx('title-temple')}>Phí vận chuyển</label>

                        <span className={cx('info-price')}>Miễn phí</span>
                    </div>
                </div>

                <div className={cx('form-total')}>
                    <div className={cx('total-price')}>
                        <label className={cx('title-total')}>Tổng Cộng</label>

                        <span className={cx('total')}>{convertPrice(carts?.total)}</span>
                    </div>
                    <div className={cx('total-price-vip')}>
                        <Link className={cx('back-order')} to={config.routes.cart}>
                            <IconChevronLeft />
                            Trở về giỏ hàng
                        </Link>

                        <Button lightBlue small onClick={handleAddOrder}>
                            Đặt Hàng
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default InfoProductOrder;
