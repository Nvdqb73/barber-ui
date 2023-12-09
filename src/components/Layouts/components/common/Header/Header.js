import { Link } from 'react-router-dom';
import { IconShoppingCart, IconMailForward, IconCalendarMonth, IconBuildingStore } from '@tabler/icons-react';

import config from '~/config';
import images from '~/assets/images';
import Image from '~/components/common/Image';
import styles from './Header.module.scss';
import classNames from 'classnames/bind';
import Search from '~/components/Layouts/components/feature/Search';
import Button from '~/components/common/Button';

const cx = classNames.bind(styles);

function Header() {
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
                            <Button to={config.routes.book} className={cx('animation-btn')}>
                                <span className={cx('heading-font')}>GIỎ HÀNG</span>
                                <IconShoppingCart color="#333" className={cx('menu-icon')} size={20} stroke={2} />
                            </Button>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    );
}

export default Header;
