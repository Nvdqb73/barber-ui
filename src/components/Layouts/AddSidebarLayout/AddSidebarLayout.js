import classNames from 'classnames/bind';

import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import Sidebar from '../components/feature/Sidebar';
import styles from './AddSidebarLayout.module.scss';

const cx = classNames.bind(styles);

function AddSidebarLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('container')}>
                <Sidebar />
                <div className={cx('content')}>{children}</div>
            </div>
            <Footer />
        </div>
    );
}

export default AddSidebarLayout;
