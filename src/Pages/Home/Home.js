import classNames from 'classnames/bind';

import styles from './Home.module.scss';
import SlideShow from '~/components/Layouts/components/feature/SlideShow/SlideShow';

const cx = classNames.bind(styles);

function Home() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('slideshow')}>
                <section className={cx('slideshow-wrapper')}>
                    <SlideShow />
                </section>
            </div>
            <div className={cx('content')}>
                
            </div>
        </div>
    );
}

export default Home;
