import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';

import * as categoryProductServices from '~/services/categoryProductServices';
import Menu, { MenuItem } from './Menu';
import styles from './Sidebar.module.scss';

const cx = classNames.bind(styles);

function Sidebar() {
    const [categoryResult, setCategoryResult] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {
            const result = await categoryProductServices.getCategory();

            if (result === undefined) {
                setCategoryResult([]);
            } else {
                setCategoryResult(result);
            }
        };
        fetchApi();
    }, []);

    return (
        <aside className={cx('wrapper')}>
            <Menu label="Mua sắm theo danh mục">
                {categoryResult.map((result) => (
                    <MenuItem key={result.cateID} title={result.cateName} to={`/product/${result.cateID}`} />
                ))}
            </Menu>
        </aside>
    );
}

export default Sidebar;
