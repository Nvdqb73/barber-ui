import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import styles from './Order.module.scss';
import DeliveryInfo from '~/components/feature/DeliveryInfo';
import Pay from '~/components/feature/Pay';
import InfoProductOrder from '~/components/feature/InfoProductOrder';

import * as customerService from '~/services/customerService';
import * as customerAddressServices from '~/services/customerAddressServices';

import * as addressServices from '~/services/addressServices';

const cx = classNames.bind(styles);
function Order() {
    const [currentUser, setCurrentUser] = useState(false);
    const [userID, setUserID] = useState(null);
    const [customerItem, setCustomerItem] = useState();
    const [customerAddress, setCustomerAddress] = useState([]);
    const [address, setAddress] = useState([]);
    const [addressNew1, setAddressNew1] = useState([]);
    const [addressNew2, setAddressNew2] = useState([]);
    const address3 = [...addressNew1, ...addressNew2];
    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            try {
                setCurrentUser(true);
                const decoded = jwtDecode(token);
                setUserID(decoded?.userID);
            } catch (error) {
                setCurrentUser(false);
                console.error('Bạn chưa đặng nhập:', error);
            }
        }
    }, []);

    useEffect(() => {
        const fetchAPi = async () => {
            const result = await customerService.getCustomer();
            if (result) {
                const customer = result.find((item) => item?.userID === userID);
                setCustomerItem(customer);
            }
        };
        fetchAPi();
    }, [userID]);

    useEffect(() => {
        const fetchApi = async () => {
            const result = await customerAddressServices.getCustomerAddress();
            if (result) {
                const customerAddressList = result.filter(
                    (item) => item?.customerID === parseInt(customerItem?.customerID),
                );
                setCustomerAddress(customerAddressList);
            }
        };

        fetchApi();
    }, [customerItem]);

    useEffect(() => {
        const fetchApi = async () => {
            const address = await addressServices.getAddress();
            if (address) {
                setAddress(address);
            }
        };
        fetchApi();
    }, []);

    console.log('customerAddress', customerAddress);
    useEffect(() => {
        if (customerAddress.length !== 0) {
            for (let index = 0; index < customerAddress.length; index++) {
                const addressCustomer1 = address?.filter((item) => item?.addressID === customerAddress[0].addressID);
                const addressCustomer2 = address?.filter((item) => item?.addressID === customerAddress[1].addressID);

                setAddressNew1(addressCustomer1);
                setAddressNew2(addressCustomer2);
            }
        }
    }, [customerAddress]);

    return (
        <div className={cx('wrapper')}>
            <DeliveryInfo customerItem={customerItem} address3={address3} />
            <Pay />
            <InfoProductOrder />
        </div>
    );
}

export default Order;
