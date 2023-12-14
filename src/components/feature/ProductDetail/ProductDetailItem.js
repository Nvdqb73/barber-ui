import classNames from 'classnames/bind';
import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { IconCurrencyDollar } from '@tabler/icons-react';
import { NumericFormat } from 'react-number-format';

import { addToCart } from '~/redux/slice/cartSlice';
import styles from './ProductDetail.module.scss';
import Button from '~/components/common/Button';

const cx = classNames.bind(styles);

function ProductDetailItem({ ...props }) {
    const { data } = props;

    const dispatch = useDispatch();

    const inputRef = useRef(null);

    const handleAddToCart = () => {
        dispatch(
            addToCart({
                ...data,
                quantity: 1,
            }),
        );
        // alert('SuccessFully');
    };

    const increaseQuantity = () => {
        const currentQuantity = parseInt(inputRef.current.value);

        if (currentQuantity < parseInt(inputRef.current.max)) {
            inputRef.current.value = currentQuantity + 1;
        }
    };

    const decreaseQuantity = () => {
        const currentQuantity = parseInt(inputRef.current.value);

        if (currentQuantity > parseInt(inputRef.current.min)) {
            inputRef.current.value = currentQuantity - 1;
        }
    };
    return (
        <div className="row">
            <div className="col-8">
                <div className={cx('purchaseBadge')}>
                    <div className={cx('imgPreview')}>
                        <div
                            className={cx('bg')}
                            style={{
                                backgroundImage: `url("${data.proImage}")`,
                            }}
                        ></div>
                    </div>
                    <div className={cx('content')}>
                        <h1 className={cx('description-heading')}>{data.proName}</h1>

                        <span className={cx('description}')}>
                            <p className={cx('description-label')}>{data.proDescription}</p>
                        </span>
                    </div>
                </div>
            </div>
            <div className="col-4">
                <ul>
                    <li className={cx('info-item')}>
                        <IconCurrencyDollar className={cx('icon')} size={30} stroke={3} />
                        <h2 className={cx('info-item-price')}>
                            <NumericFormat className={cx('numberFormat')} value={data.price} thousandSeparator="./" />
                        </h2>
                    </li>

                    <li>
                        <div className={cx('from-quantity')}>
                            <label className={cx('label-quantity')} htmlFor="quantity">
                                Quantity:
                            </label>
                            <input
                                ref={inputRef}
                                type="number"
                                id="quantity"
                                name="quantity"
                                min="1"
                                max="100"
                                step="1"
                                defaultValue="1"
                                className={cx('input-quantity')}
                            />

                            <div className={cx('btn-quantity')}>
                                <button type="button" onClick={increaseQuantity}>
                                    <p className={cx('icon-quantity')}>+</p>
                                </button>
                                <button type="button" onClick={decreaseQuantity}>
                                    <p className={cx('icon-quantity')}>-</p>
                                </button>
                            </div>
                        </div>
                    </li>

                    <li>
                        <Button outline className={cx('btn-add')} onClick={handleAddToCart} variant="success">
                            ADD TO CART
                        </Button>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default ProductDetailItem;
