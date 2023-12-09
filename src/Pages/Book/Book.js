import classNames from 'classnames/bind';

import styles from './Book.module.scss';

const cx = classNames.bind(styles);

function Book() {
    return (
        <div className={cx('wrapper')}>
            {/* Banner */}
            <div className={cx('container')}>
                <div className={cx('content')}></div>
            </div>
        </div>
    );
}

export default Book;
