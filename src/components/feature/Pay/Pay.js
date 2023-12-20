import classNames from 'classnames/bind';
import styles from './Pay..module.scss';

const cx = classNames.bind(styles);

function Pay() {
    return <div className={cx('wrapper')}>Thanh toán</div>;
}

export default Pay;
