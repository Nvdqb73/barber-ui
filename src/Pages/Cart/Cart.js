import classNames from 'classnames/bind';
import { useSelector } from 'react-redux';

import CartResult from '~/components/feature/CartItem/CartResult';
import styles from './Cart.module.scss';
import CartItem from '~/components/feature/CartItem';
import { cartSelector } from '~/redux/selectors';

const cx = classNames.bind(styles);

function Cart() {
    const carts = useSelector(cartSelector);

    return (
        <div className={cx('wrapper')}>
            <section className={cx('cart-items')}>
                {carts?.list && carts?.list?.length > 0 ? (
                    carts?.list?.map((cart) => <CartItem key={cart.proID} data={cart} />)
                ) : (
                    <h1 className="no-items">No Items are add in Cart</h1>
                )}
            </section>
            <CartResult data={carts} />
        </div>
    );
}

export default Cart;
