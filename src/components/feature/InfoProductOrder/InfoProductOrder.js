import classNames from 'classnames/bind';
import styles from './InfoProductOrder.module.scss';

const cx = classNames.bind(styles);

function InfoProductOrder() {
    return <div className={cx('wrapper')}>Thông tin đơn hàng</div>;
}

export default InfoProductOrder;
