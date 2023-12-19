import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import styles from './PersonalPage.module.scss';
import FormControl from '~/components/feature/FormControl';

import Button from '~/components/common/Button';
import Image from '~/components/common/Image';

const cx = classNames.bind(styles);

function PersonalPage() {
    const location = useLocation();
    const { state } = location?.state;
    // console.log('state', state);

    const [firstName, setFirstName] = useState(state?.firstName);
    const [lastName, setLastName] = useState(state?.lastName);
    const [avatar, setAvatar] = useState({ preview: state?.picture });
    // useEffect(() => {
    //     return () => {
    //         avatar.preview !== null && URL.revokeObjectURL(avatar.preview);
    //     };
    // }, [avatar]);

    const handlePreviewAvatar = (e) => {
        const file = e.target.files[0];

        file.preview = URL.createObjectURL(file);
        console.log('file', file);
        setAvatar(file);
    };
    console.log('avatar', avatar);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <h2>Hồ Sơ Của Tôi</h2>
                <h4>Quản lý thông tin hồ sơ để bảo mât tài khoản</h4>
            </div>
            <div className={cx('content')}>
                <div className={cx('form-info')}>
                    <div className={cx('form-name')}>
                        <FormControl
                            value={firstName}
                            labelTitle="Họ & Tên đệm"
                            placeholder="Họ & Tên đệm"
                            name="firstName"
                            type="text"
                            labelComeback
                            personal
                            otherLabel
                            setFirstName={setFirstName}
                        />
                        <FormControl
                            value={lastName}
                            labelTitle="Tên"
                            placeholder="Tên"
                            name="lastName"
                            type="text"
                            labelComeback
                            personal
                            setLastName={setLastName}
                        />
                    </div>
                    <div className={cx('form-email')}>
                        <label className={cx('text-center')}>Email</label>
                        <p className={cx('text-center')}>{state?.email}</p>
                        <a href="/" className={cx('change-info')}>
                            Thay đổi
                        </a>
                    </div>
                    <div className={cx('form-phone')}>
                        <label className={cx('text-center')}>Số điện thoại</label>
                        <p className={cx('text-center')}>{state?.numberphone}</p>
                        <a href="/" className={cx('change-info')}>
                            Thay đổi
                        </a>
                    </div>
                    <div className={cx('form-date')}>
                        <label htmlFor="date" className={cx('text-center')}>
                            Ngày Sinh
                        </label>
                        <input
                            type="date"
                            id="date"
                            value={state?.dateOfBirth}
                            // onChange={handleDateChange}
                            className={cx('inputField')}
                        />
                    </div>

                    <div className={cx('form-save')}>
                        <Button lightBlue className={'btn-submit'}>
                            Lưu Thông Tin
                        </Button>
                    </div>
                </div>
                <div className={cx('form-images')}>
                    <div className={cx('avatar-images')}>
                        {avatar && <Image src={avatar.preview} className={cx('images')} />}
                    </div>
                    <input type="file" id="file-input" className={cx('input-avatar')} onChange={handlePreviewAvatar} />
                    <div className={cx('file-avatar')}>
                        <label htmlFor="file-input" className={cx('file-avatar-input')}>
                            Chọn Ảnh
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PersonalPage;
