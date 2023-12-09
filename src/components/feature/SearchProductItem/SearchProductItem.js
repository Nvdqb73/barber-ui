import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './SearchProductItem.module.scss';
import { Link } from 'react-router-dom';

import Image from '~/components/common/Image';

const cx = classNames.bind(styles);
function SearchProductItem({ ...props }) {
    const { data, setSearchResult, setSearchValue } = props;

    const handleHideResult = () => {
        setSearchValue('');
        setSearchResult([]);
    };
    return (
        <Link to={`/course/${data.maKH}`} className={cx('wrapper')} onClick={() => handleHideResult()}>
            <Image className={cx('avatar')} src={data.hinh} alt={data.tenKH} />
            <span className={cx('name')}>{data.tenKH}</span>
        </Link>
    );
}

SearchProductItem.propTypes = {
    data: PropTypes.object,
};

export default SearchProductItem;
