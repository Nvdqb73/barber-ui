import { Link } from 'react-router-dom';
import {
    IconShoppingCart,
    IconMailForward,
    IconCalendarMonth,
    IconBuildingStore,
    IconUserMinus,
    IconSettings,
    IconArrowBarRight,
    IconCalendarStats,
} from '@tabler/icons-react';

import { useSelector } from 'react-redux';

import config from '~/config';
import images from '~/assets/images';
import Image from '~/components/common/Image';
import styles from './Header.module.scss';
import classNames from 'classnames/bind';
import Search from '~/components/Layouts/components/feature/Search';
import Button from '~/components/common/Button';
import { cartSelector } from '~/redux/selectors';
import Menu from '../Popper/Menu';
import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);

function Header() {
    const { list } = useSelector(cartSelector);
    const [logout, setLogout] = useState(true);
    const [login, setLogin] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setLogin(true);
            setLogout(false);
        }
    }, []);

    const userMenu = [
        {
            icon: <IconUserMinus size={15} color="#333" stroke={2} />,
            title: 'Trang cá nhân',
            to: './huhu',
        },
        {
            icon: <IconCalendarStats size={15} color="#333" stroke={2} />,
            title: 'Lịch sử đặt lịch',
            to: '/bookingHistory',
        },
        {
            icon: <IconSettings size={15} color="#333" stroke={2} />,
            title: 'Cài đặt',
            to: './huhu',
        },
        {
            icon: <IconArrowBarRight size={15} color="#333" stroke={2} />,
            login,
            logout,
            separate: true,
        },
    ];

    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('logo')}>
                    <Link to={config.routes.home}>
                        <Image className={cx('images')} src={images.site_logo} alt="BarberShop" />
                    </Link>
                </div>

                <Search />

                <div className={cx('actions')}>
                    <ul className={cx('menu')}>
                        <li className={cx('menu-item')}>
                            <Button to={config.routes.product} className={cx('animation-btn')}>
                                <span className={cx('heading-font')}>SẢN PHẨM</span>
                                <IconBuildingStore color="#333" className={cx('menu-icon')} size={20} stroke={2} />
                            </Button>
                        </li>

                        <li className={cx('menu-item')}>
                            <Button to={config.routes.book} className={cx('animation-btn')}>
                                <span className={cx('heading-font')}>ĐẶT LỊCH</span>
                                <IconCalendarMonth color="#333" className={cx('menu-icon')} size={20} stroke={2} />
                            </Button>
                        </li>
                        <li className={cx('menu-item')}>
                            <Button to={config.routes.contact} className={cx('animation-btn')}>
                                <span className={cx('heading-font')}>LIÊN HỆ</span>
                                <IconMailForward color="#333" className={cx('menu-icon')} size={20} stroke={2} />
                            </Button>
                        </li>
                        <li className={cx('menu-item')}>
                            <Button to={config.routes.cart} className={cx('animation-btn')}>
                                <span className={cx('heading-font')}>GIỎ HÀNG</span>
                                <IconShoppingCart color="#333" className={cx('menu-icon')} size={20} stroke={2} />
                                <span className={cx('total-productItem')}>{list?.length}</span>
                            </Button>
                        </li>
                        <li className={cx('menu-item')}>
                            <Menu items={userMenu}>
                                <Image
                                    className={cx('user-avatar')}
                                    src="https://avatars.githubusercontent.com/u/88336997?v=4"
                                    alt="Nguyen văn A"
                                />
                            </Menu>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    );
}

export default Header;
