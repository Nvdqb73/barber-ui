import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './DeliveryInfo.module.scss';
import FormControl from '~/components/feature/FormControl';

const cx = classNames.bind(styles);

function DeliveryInfo({ ...props }) {
    const { customerItem, address3 } = props;

    console.log('customerItem?.firstName', customerItem?.firstName);

    const [firstName, setFirstName] = useState(customerItem?.firstName);
    const [lastName, setLastName] = useState(customerItem?.lastName);
    const [email, setEmail] = useState(customerItem?.email);
    const [phone, setPhone] = useState(customerItem?.numberphone);

    const [selectedAddress, setSelectedAddress] = useState({});

    const handleStoreChange = (e) => {
        const selectedAddressId = e.target.value;
        const selectedStore = address3?.find((item) => item?.addressID === parseInt(selectedAddressId));
        console.log('1', selectedAddressId);
        console.log('vip địa chỉ', selectedStore);
        // setAddress(selectedAddressId);
        setSelectedAddress(selectedStore);
    };

    console.log('selectedAddress', selectedAddress);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('heading-info')}>
                <h2>Thông tin nhân hàng</h2>
            </div>
            <span>{customerItem?.firstName}</span>
            <div>
                <div className={cx('formGroup')}>
                    <label htmlFor="address">Địa chỉ</label>
                    <select
                        id="address"
                        value={selectedAddress?.currentAddress}
                        onChange={handleStoreChange}
                        className={cx('inputField')}
                    >
                        <option value="">-- Chọn địa chỉ--</option>
                        {address3?.map((item) => (
                            <option key={item?.addressID} value={item?.addressID}>
                                {item?.currentAddress}
                            </option>
                        ))}
                    </select>
                </div>
                <FormControl
                    value={email}
                    labelTitle="Email"
                    placeholder="Email"
                    name="email"
                    type="text"
                    labelComeback
                    setEmail={setEmail}
                />
                <div className={cx('form-name')}>
                    <FormControl
                        value={firstName}
                        labelTitle="Họ"
                        placeholder="Họ & Tên đệm"
                        name="firstName"
                        type="text"
                        labelComeback
                        setFirstName={setFirstName}
                    />
                    <FormControl
                        value={lastName}
                        labelTitle="Tên"
                        placeholder="Tên"
                        name="lastName"
                        type="text"
                        labelComeback
                        setLastName={setLastName}
                        orderSize="orderSize"
                    />
                </div>
                <FormControl
                    value={phone}
                    labelTitle="Số điện thoai"
                    placeholder="Số điện thoại"
                    name="phone"
                    type="number"
                    labelComeback
                    setPhone={setPhone}
                />
            </div>
        </div>
    );
}

export default DeliveryInfo;
