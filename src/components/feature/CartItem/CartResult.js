import classNames from 'classnames/bind';

import styles from './CartItem.module.scss';
const cx = classNames.bind(styles);

function CartResult({ data }) {
    return (
        <div className={cx('cart-total')}>
            <h2 className={cx('heading-result')}>Cart Summary</h2>
            <div className={cx('content-total')}>
                <h4>Quantity :</h4>
                <h3>{data.count}</h3>
            </div>
            <div className={cx('content-total')}>
                <h4>Total Price :</h4>
                <h3>${data.total}</h3>
            </div>
        </div>
    );
}

export default CartResult;
