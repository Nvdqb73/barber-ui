import styles from './Select.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function Select({ id, name, className, children }) {
    return (
        <select
            id={id}
            name={name}
            defaultValue={'featured'}
            className={cx('form-control', {
                [className]: className,
                form_select: true,
            })}
        >
            {children}
        </select>
    );
}

export default Select;
