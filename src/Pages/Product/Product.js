import NavigationContent from '~/components/Layouts/components/feature/NavigationContent';
import styles from './Product.module.scss';
import classNames from 'classnames/bind';
import Products from '~/components/feature/Products';

const cx = classNames.bind(styles);
function Product() {
    return (
        <div className={cx('wrapper')}>
            <NavigationContent />
            <div className={cx('container-body')}>
                <Products />
            </div>
        </div>
    );
}

export default Product;
