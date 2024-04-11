import classNames from 'classnames/bind';
import { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { jwtDecode } from 'jwt-decode';

import styles from './PersonalPage.module.scss';
import FormControl from '~/components/feature/FormControl';

import Button from '~/components/common/Button';
import Image from '~/components/common/Image';
import BookingWarning from '~/components/common/BookingWarning';

import * as customerService from '~/services/customerService';
import * as userService from '~/services/userServices';
import { bool } from 'prop-types';

const cx = classNames.bind(styles);

function PersonalPage() {
    const location = useLocation();
    const { state } = location?.state;

    const [userId, setUserId] = useState('');
    const [customerId, setCustomerId] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [avatarCurrent, setAvatarCurrent] = useState(null);
    const [avatarNew, setAvatarNew] = useState();
    const [showInputEmail, setShowInputEmail] = useState(false);
    const [showInputSDT, setShowInputSDT] = useState(false);
    const [showPersonalPage, setPersonalPage] = useState(false);

    const [dateOfBirth, setDateOfBirth] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            try {
                setPersonalPage(true);
                const decoded = jwtDecode(token);

                if (decoded?.userID) {
                    const fetchApi = async () => {
                        const customers = await customerService.getCustomer();
                        if (customers) {
                            const customer = customers.find((customer) => customer?.userID === decoded?.userID);
                            if (customer) {
                                setUserId(customer?.userID);
                                setCustomerId(customer?.customerID);
                                setFirstName(customer?.firstName);
                                setLastName(customer?.lastName);
                                setEmail(customer?.email);
                                setPhone(customer?.numberphone);
                                setAvatarCurrent(customer?.picture);
                                setDateOfBirth(customer?.dateOfBirth.slice(0, 10));
                            }
                        }
                    };

                    fetchApi();
                }
            } catch (error) {
                setPersonalPage(false);
                toast.error('Bạn chưa đăng nhập!');
            }
        }
    }, []);

    // useEffect(() => {
    //     return () => {
    //         avatarNew && URL.revokeObjectURL(avatarNew.preview);
    //     };
    // }, [avatarNew]);

    // const handlePreviewAvatar = (e) => {
    //     const file = e.target.files[0];

    //     file.preview = URL.createObjectURL(file);
    //     setAvatarNew(file);
    // };

    const handleDateChange = (event) => {
        const selectedDate = event.target.value;
        if (!selectedDate) {
            setDateOfBirth('');
        } else {
            setDateOfBirth(selectedDate);
        }
    };

    const handleUpdateInfo = async () => {
        try {
            const result = await customerService.updateCustomer(
                customerId,
                firstName,
                lastName,
                undefined,
                email,
                phone,
                dateOfBirth,
                userId,
            );
            if (result) {
                toast.success('Cập nhật thành công');
            } else {
                toast.success('Cập nhật thất bại');
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            {showPersonalPage == null ? (
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
                                {showInputEmail ? (
                                    <FormControl
                                        value={email}
                                        labelTitle="Email"
                                        placeholder="Email muốn thay đổi....."
                                        name="email"
                                        type="text"
                                        labelComeback
                                        personal
                                        otherLabel
                                        setEmail={setEmail}
                                    />
                                ) : (
                                    <>
                                        <label className={cx('text-center')}>Email</label>
                                        <p
                                            className={cx('text-center', {
                                                'margin-label': true,
                                            })}
                                        >
                                            {email === 'null' || phone === '' ? 'Chưa có Email!' : email}
                                        </p>
                                    </>
                                )}
                                <button
                                    className={cx('change-info')}
                                    onClick={() => setShowInputEmail(!showInputEmail)}
                                >
                                    Thay đổi
                                </button>
                            </div>

                            <div className={cx('form-email')}>
                                {showInputSDT ? (
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
                                ) : (
                                    <>
                                        <label className={cx('text-center')}>SDT</label>
                                        <p
                                            className={cx('text-center', {
                                                'margin-label': true,
                                            })}
                                        >
                                            {phone === 'null' || phone === '' ? 'Chưa có SDT!' : phone}
                                        </p>
                                    </>
                                )}
                                <button className={cx('change-info')} onClick={() => setShowInputSDT(!showInputSDT)}>
                                    Thay đổi
                                </button>
                            </div>

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
                        {/* <div className={cx('form-images')}>
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
                        </div> */}
                    </div>
                </div>
            )}
        </>
    );
}

export default PersonalPage;
