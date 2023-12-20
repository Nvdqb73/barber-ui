import classNames from 'classnames/bind';
import { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import styles from './PersonalPage.module.scss';
import FormControl from '~/components/feature/FormControl';

import Button from '~/components/common/Button';
import Image from '~/components/common/Image';
import BookingWarning from '~/components/common/BookingWarning';

import * as customerService from '~/services/customerService';

const cx = classNames.bind(styles);

function PersonalPage() {
    const location = useLocation();
    const { state } = location?.state;

    const userIDRef = useRef(state?.userID);
    const customerIDRef = useRef(state?.customerID);
    const [firstName, setFirstName] = useState(state?.firstName);
    const [lastName, setLastName] = useState(state?.lastName);
    const [email, setEmail] = useState(state?.email);
    const [phone, setPhone] = useState(state?.numberphone);
    const [avatarCurrent, setAvatarCurrent] = useState({ preview: state?.picture });
    const [avatarNew, setAvatarNew] = useState();

    const textDateOfBirth = state?.dateOfBirth.slice(0, 10);

    const [dateOfBirth, setDateOfBirth] = useState(textDateOfBirth);
    useEffect(() => {
        return () => {
            avatarNew && URL.revokeObjectURL(avatarNew.preview);
        };
    }, [avatarNew]);

    const handlePreviewAvatar = (e) => {
        const file = e.target.files[0];

        file.preview = URL.createObjectURL(file);
        // console.log('file', file);
        setAvatarNew(file);
    };

    const handleDateChange = (event) => {
        const selectedDate = event.target.value;
        if (!selectedDate) {
            setDateOfBirth('');
        } else {
            setDateOfBirth(selectedDate);
        }
    };

    const handleUpdateInfo = async () => {
        const userID = userIDRef.current;
        const customerID = customerIDRef.current;
        try {
            const result = await customerService.updateCustomer(
                customerID,
                firstName,
                lastName,
                undefined,
                email,
                phone,
                dateOfBirth,
                userID,
            );
            if (result) {
                // window.location.reload();
                toast.success('Cập nhật thành công');
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            {state === null ? (
                <BookingWarning title="Vui lòng đăng nhập để xem hồ sơ" />
            ) : (
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
                                <p className={cx('text-center')}>{email}</p>
                                <a href="/" className={cx('change-info')}>
                                    Thay đổi
                                </a>
                            </div>
                            <FormControl
                                value={phone}
                                labelTitle="Số điện thoai"
                                placeholder="Số điện thoại"
                                name="phone"
                                type="text"
                                labelComeback
                                personal
                                otherLabel
                                setPhone={setPhone}
                            />
                            <div className={cx('form-date')}>
                                <label htmlFor="date" className={cx('text-center')}>
                                    Ngày Sinh
                                </label>
                                <input
                                    type="date"
                                    id="date"
                                    value={dateOfBirth}
                                    onChange={handleDateChange}
                                    className={cx('inputField')}
                                />
                            </div>

                            <div className={cx('form-save')}>
                                <Button lightBlue className={'btn-submit'} onClick={handleUpdateInfo}>
                                    Lưu Thông Tin
                                </Button>
                            </div>
                        </div>
                        <div className={cx('form-images')}>
                            <div className={cx('avatar-images')}>
                                <>
                                    {avatarNew ? (
                                        <Image src={avatarNew.preview} alt="avatar" className={cx('images')} />
                                    ) : (
                                        <Image src={avatarCurrent.preview} alt="avatar" className={cx('images')} />
                                    )}
                                </>
                            </div>
                            <input
                                type="file"
                                id="file-input"
                                className={cx('input-avatar')}
                                onChange={handlePreviewAvatar}
                            />
                            <div className={cx('file-avatar')}>
                                <label htmlFor="file-input" className={cx('file-avatar-input')}>
                                    Chọn Ảnh
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default PersonalPage;
