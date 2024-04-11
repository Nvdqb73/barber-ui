import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './Order.module.scss';
import DeliveryInfo from '~/components/feature/DeliveryInfo';
import Pay from '~/components/feature/Pay';
import InfoProductOrder from '~/components/feature/InfoProductOrder';

import * as paymentServices from '~/services/paymentServices';
import * as customerAddressServices from '~/services/customerAddressServices';
import * as addressServices from '~/services/addressServices';

const cx = classNames.bind(styles);
function Order() {
    const [currentUser, setCurrentUser] = useState(false);
    const [userID, setUserID] = useState(null);
    const [customerItem, setCustomerItem] = useState({});
    const [customerAddress, setCustomerAddress] = useState([]);
    const [address, setAddress] = useState([]);
    const [addressNew1, setAddressNew1] = useState([]);
    const [addressNew2, setAddressNew2] = useState([]);
    const address3 = [...addressNew1, ...addressNew2];

    const location = useLocation();
    const { state } = location?.state;

    useEffect(() => {
        const fetchApi = async () => {
            const address = await addressServices.getAddress();
            if (address) {
                setAddress(address);
            }
        };
        fetchApi();
    }, []);

    useEffect(() => {
        const fetchApi = async () => {
            const result = await customerAddressServices.getCustomerAddress();

            if (result) {
                const customerAddressList = result.filter((item) => item?.customerID === state?.customerID);
                setCustomerAddress(customerAddressList);
            }
        };

        fetchApi();
    }, []);

    useEffect(() => {
        if (customerAddress.length !== 0) {
            for (let index = 0; index < customerAddress.length; index++) {
                const addressCustomer1 = address?.filter((item) => item?.addressID == customerAddress[0].addressID);
                const addressCustomer2 = address?.filter((item) => item?.addressID == customerAddress[1].addressID);
                setAddressNew1(addressCustomer1);
                setAddressNew2(addressCustomer2);
            }
        }
    }, [customerAddress]);

    const [pays, setPays] = useState([]);
    const [checked, setChecked] = useState(2);

    useEffect(() => {
        const fetchApi = async () => {
            const response = await paymentServices.getPayment();
            if (response) {
                setPays(response);
            }
        };

        fetchApi();
    }, []);

    return (
        <div className={cx('wrapper')}>
            <DeliveryInfo state={state} address3={address3} />
            <Pay pays={pays} checked={checked} setChecked={setChecked} />
            <InfoProductOrder state={state} checked={checked} />
        </div>
    );
}

export default Order;
