import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import styles from './Products.module.scss';
import Button from '~/components/common/Button';
import { convertPrice } from '~/utils/convert';

const cx = classNames.bind(styles);

function ProductItem({ data }) {
    return (
        <div className={cx('product-item')}>
            <Button
                className={cx('avatar')}
                to={`/product/${data?.proID}`}
                style={{
                    backgroundImage: `url("${data?.proImage}")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: '50%',
                    backgroundSize: 'cover',
                    display: 'block',
                    objectFit: 'cover',
                    overFlow: 'hidden',
                    width: '100%',
                    height: '220px',
                    color: 'blue',
                }}
            >
                <Button primary className={cx('btn-product')} to={`/product/${data?.proID}`}>
                    Xem Sản Phẩm
                </Button>
            </Button>
            <h3 className={cx('product-name')}>
                <Button className={cx('link-name')} href="hadfas">
                    {data?.proName}
                </Button>
            </h3>
            <div className={cx('students-count')}>
                <span className={cx('quantity')}>{convertPrice(data?.price)}</span>
            </div>
        </div>
    );
}

ProductItem.propTypes = {
    data: PropTypes.object,
};

export default ProductItem;
