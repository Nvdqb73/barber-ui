import classNames from 'classnames/bind';

import { convertPrice } from '~/utils/convert';
import styles from './CartItem.module.scss';
import Button from '~/components/common/Button';

const cx = classNames.bind(styles);

function CartResult({ ...props }) {
    const { data, userID } = props;

    console.log('userID', userID);
    const handleOrder = () => {};

    return (
        <div className={cx('wrapper')}>
            <div className={cx('cart-total')}>
                <h2 className={cx('heading-result')}>Cart Summary</h2>
                <div className={cx('content-total')}>
                    <h4>Quantity :</h4>
                    <h3>{data?.count}</h3>
                </div>
                <div className={cx('content-total')}>
                    <h4>Total Price :</h4>
                    <h3>{convertPrice(data?.total)}</h3>
                </div>
            </div>
            <div className={cx('order-form')}>
                <Button lightBlue className={cx('btn-order')} onClick={handleOrder}>
                    Đặt Hàng
                </Button>
            </div>
        </div>
    );
}

export default CartResult;
