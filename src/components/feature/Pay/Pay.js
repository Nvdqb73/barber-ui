import classNames from 'classnames/bind';
import styles from './Pay..module.scss';

const cx = classNames.bind(styles);

function Pay({ ...props }) {
    const { pays, checked, setChecked } = props;

    return (
        <div className={cx('wrapper')}>
            <div className={cx('heading-info')}>
                <h2>Thanh toán</h2>
            </div>
            <div className={cx('form-pay')}>
                {pays.map((pay) => (
                    <div key={pay.payID} className={cx('pay-item')}>
                        <input type="radio" checked={checked === pay.payID} onChange={() => setChecked(pay.payID)} />
                        <p className={cx('pay-name')}>{pay.payMethod}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Pay;
