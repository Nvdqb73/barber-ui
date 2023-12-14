import Select from '~/components/common/Select';
import styles from './NavigationContext.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function NavigationContext() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('from-control')}>
                <label htmlFor="products" className={cx('heading-from')}>
                    Sắp xếp theo:
                </label>
                <Select name={'products'} id={'products'} className={cx('select-option')}>
                    <option value="featured">Đặc sắc</option>
                    <option value="best-selling">Bán chạy nhất</option>
                    <option value="title-ascending">Theo thứ tự bảng chữ cái, A-Z</option>
                    <option value="title-descending">Theo thứ tự bảng chữ cái, Z-A</option>
                    <option value="price-ascending">Giá từ thấp đến cao</option>
                    <option value="price-descending">Giá từ cao xuống thấp</option>
                </Select>
            </div>
        </div>
    );
}

export default NavigationContext;
